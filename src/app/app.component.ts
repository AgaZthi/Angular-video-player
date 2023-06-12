import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('videoPlayer') videoPlayer: any;
  videoDuration = 0;
  trimStartTime = 0;
  trimEndTime = 0;
  isTrimming = false;
  title = 'angular-videoplayer-app';

  // playlist = [
  //   {
  //     title: 'Agent 327!',
  //     src: 'https://media.vimejs.com/720p.mp4',
  //     type: 'video/mp4',
  //   },
  //   {
  //     title: 'Big Buck Bunny',
  //     src: 'http://static.videogular.com/assets/videos/big_buck_bunny_720p_h264.mov',
  //     type: 'video/mp4',
  //   },
  //   {
  //     title: 'Messi Goal',
  //     src: 'http://static.videogular.com/assets/videos/goal-2.mp4',
  //     type: 'video/mp4',
  //   },
  // ];

  // currentIndex = 0;
  // activeVideo = this.playlist[this.currentIndex];
  // api!: {
  //   getDefaultMedia: () => {
  //     (): any;
  //     new (): any;
  //     subscriptions: {
  //       (): any;
  //       new (): any;
  //       loadedMetadata: {
  //         (): any;
  //         new (): any;
  //         subscribe: { (arg0: () => void): void; new (): any };
  //       };
  //       ended: {
  //         (): any;
  //         new (): any;
  //         subscribe: { (arg0: () => void): void; new (): any };
  //       };
  //     };
  //   };
  //   play: () => void;
  // };

  // constructor() {}

  // onPlayerSet(api: any) {
  //   this.api = api;

  //   this.api
  //     .getDefaultMedia()
  //     .subscriptions.loadedMetadata.subscribe(this.startVideo.bind(this));
  //   this.api
  //     .getDefaultMedia()
  //     .subscriptions.ended.subscribe(this.nextVideo.bind(this));
  // }

  // nextVideo() {
  //   this.currentIndex++;

  //   if (this.currentIndex === this.playlist.length) {
  //     this.currentIndex = 0;
  //   }

  //   this.activeVideo = this.playlist[this.currentIndex];
  // }

  // startVideo() {
  //   this.api.play();
  // }

  // onClickPlaylistVideo(
  //   item: { title: string; src: string; type: string },
  //   index: number
  // ) {
  //   this.currentIndex = index;
  //   this.activeVideo = item;
  // }
  ngAfterViewInit(): void {
    // Get the duration of the video
    this.videoDuration = this.videoPlayer.nativeElement.duration;
  }

  startTrim(): void {
    console.log('start trim');
    this.trimStartTime = this.videoPlayer.nativeElement.currentTime;
    this.isTrimming = true;
  }

  endTrim(): void {
    console.log('end trim');

    this.trimEndTime = this.videoPlayer.nativeElement.currentTime;
    this.isTrimming = false;
  }

  playTrimmedVideo(): void {
    // Set the current time of the video to the start time
    this.videoPlayer.nativeElement.currentTime = this.trimStartTime;

    // Add an event listener to pause the video when it reaches the end time
    this.videoPlayer.nativeElement.addEventListener('timeupdate', () => {
      if (this.videoPlayer.nativeElement.currentTime >= this.trimEndTime) {
        this.videoPlayer.nativeElement.pause();
      }
    });

    // Start playing the video
    this.videoPlayer.nativeElement.play();
  }

  updateProgressBar(): void {
    if (this.isTrimming) {
      const progress =
        (this.videoPlayer.nativeElement.currentTime / this.videoDuration) * 100;
      if (progress > (this.trimEndTime / this.videoDuration) * 100) {
        this.videoPlayer.nativeElement.pause();
      }
    }
  }
  toggleTrimming(): void {
    if (this.isTrimming) {
      this.trimEndTime = this.videoPlayer.nativeElement.currentTime;
    } else {
      this.trimStartTime = this.videoPlayer.nativeElement.currentTime;
    }
    this.isTrimming = !this.isTrimming;
  }

  calculateProgressWidth(): number {
    return (
      (this.videoPlayer.nativeElement.currentTime / this.videoDuration) * 100
    );
  }

  calculateCutoffStart(): number {
    return (this.trimStartTime / this.videoDuration) * 100;
  }

  calculateCutoffEnd(): number {
    return (this.trimEndTime / this.videoDuration) * 100;
  }
}
