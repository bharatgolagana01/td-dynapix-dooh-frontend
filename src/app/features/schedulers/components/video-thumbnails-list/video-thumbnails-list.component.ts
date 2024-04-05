import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VideoDialogComponent } from '../video-dialog/video-dialog.component';
import { SchedulerService } from '../scheduler.service';
export interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
  uploadTime: string;
  views: string;
  author: string;
  videoUrl: string;
  description: string;
  subscriber: string;
  isLive: boolean;
}


@Component({
  selector: 'app-video-thumbnails-list',
  templateUrl: './video-thumbnails-list.component.html',
  styleUrls: ['./video-thumbnails-list.component.scss'],
})
export class VideoThumbnailsListComponent {
  @Output() selectedVideosChange: EventEmitter<Video[] | string[]> = new EventEmitter<Video[] | string[]>();

  public videos: any[] = [];
  public selectedVideos: Video[] = [];
  constructor(private dialog: MatDialog,private schedulerService:SchedulerService) {}
  ngOnInit(): void {
    this.schedulerService.getVideos().subscribe((videosList: any[]) => {
      if (Array.isArray(videosList) && videosList.length > 0) {
        // Filter out objects that have the expected videoUrl property
        const validVideos = videosList.filter(video => video.videoUrl);
        if (validVideos.length > 0) {
          console.log("Valid video list:", validVideos);
          // Assign unique IDs to videos
          this.videos = validVideos.map((video, index) => ({
            id: index.toString(),
            ...video
          }));
        } else {
          console.error("No valid videos found.");
        }
      } else {
        console.error("Invalid video list format:", videosList);
      }
    });
  }
  

  openVideoDialog(videoUrl: string): void {
    this.dialog.open(VideoDialogComponent, {
      data: { videoUrl },
    });
  }

  toggleSelection(video: Video): void {
    const index = this.selectedVideos.findIndex((v) => v.id === video.id);
    if (index === -1) {
      this.selectedVideos.push(video);
    } else {
      this.selectedVideos.splice(index, 1);
    }
    console.log('final selected videos', this.selectedVideos);
    this.selectedVideosChange.emit(this.selectedVideos);
  }

  isSelected(video: any): boolean {
    return this.selectedVideos.some(
      (selectedVideo) => selectedVideo.id === video.id
    );
  }
}
