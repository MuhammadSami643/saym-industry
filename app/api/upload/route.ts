import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// Max file size: 60MB (accommodates high-res tech packs and sample videos)
const MAX_FILE_SIZE = 60 * 1024 * 1024;

const VIDEO_EXTENSIONS = new Set([
  '.mp4',
  '.webm',
  '.mov',
  '.m4v',
  '.avi'
]);

const ALLOWED_EXTENSIONS = new Set([
  '.pdf',
  '.ai',
  '.psd',
  '.eps',
  '.zip',
  '.rar',
  '.png',
  '.jpg',
  '.jpeg',
  '.svg',
  '.webp',
  '.docx',
  ...VIDEO_EXTENSIONS
]);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds maximum limit of 60MB.' },
        { status: 400 }
      );
    }

    const originalName = file.name || 'unnamed-file';
    const ext = path.extname(originalName).toLowerCase();

    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json(
        { error: `File type ${ext || 'unknown'} is not supported. Please upload PDF, AI, PSD, ZIP, video (MP4/WebM/MOV) or high-res images.` },
        { status: 400 }
      );
    }

    const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg']);
    const isVideo = VIDEO_EXTENSIONS.has(ext);
    const isImage = IMAGE_EXTENSIONS.has(ext);
    const requestedFolder = formData.get('folder') as string | null;

    let subFolder = 'techpacks';
    if (requestedFolder === 'blog' || requestedFolder === 'blogs') {
      subFolder = 'blog';
    } else if (isVideo) {
      subFolder = 'videos';
    } else if (isImage) {
      subFolder = 'images';
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', subFolder);
    await mkdir(uploadDir, { recursive: true });

    // Generate safe unique filename
    const safeBase = path.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const prefix = isVideo ? 'sample_video' : (subFolder === 'blog' ? 'blog' : (isImage ? 'img' : 'techpack'));
    const uniqueName = `${prefix}_${Date.now()}_${safeBase}${ext}`;
    const filePath = path.join(uploadDir, uniqueName);

    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${subFolder}/${uniqueName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: originalName,
      fileSize: file.size,
      mimeType: file.type || (isVideo ? 'video/mp4' : 'application/octet-stream'),
      isVideo
    });
  } catch (err: any) {
    console.error('File upload error in /api/upload:', err);
    return NextResponse.json(
      { error: err.message || 'File upload failed.' },
      { status: 500 }
    );
  }
}

