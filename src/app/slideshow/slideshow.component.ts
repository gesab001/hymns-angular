import { Component, ViewChild, EventEmitter, Output, OnChanges, AfterViewInit, SimpleChanges, Input, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
 import {MatSliderChange} from '@angular/material/slider';
@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements OnChanges, OnInit, AfterViewInit {
  slideNumber = 0;
  messagetoparent: number = this.slideNumber;
  linewidth: number = 0;
  @Output() messageEvent = new EventEmitter<number>();

 sendMessage() {
    this.messageEvent.emit(this.messagetoparent);
  }
  isMobile = false;
  @Input() message: any;
  max: number;
  @ViewChild('slider')slider;
  verses: any;
 constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.activateHandsetLayout();
      }
      else {
        this.activateWebLayout();
      }
    });
  }
  formatLabel(value: number) {
    return value + 1;
  }
  ngOnChanges(changes: SimpleChanges) {
    this.loadVerses(changes.message.currentValue);
    this.getLongestLine();


    
   }

  ngOnInit() {
     this.verses = this.message;
     this.max = this.verses.length -1;
     this.getLongestLine();

  }
  
  ngAfterViewInit(){

     this.slider.focus();
  }

   loadVerses(verses){
      this.verses = null;
      this.verses = verses;
      this.max = this.verses.length -1;
      this.slideNumber = 0;
      this.slider.value = 0;
      this.slider.focus();

   }

  getLongestLine(){
    console.log("getlongestline" + this.verses);
  }
  
  onInputChange(event: MatSliderChange) {
    this.slideNumber = event.value;
    this.sendMessage();
  }

 activateWebLayout(){
     this.isMobile = false;
  };

  activateHandsetLayout(){
     this.isMobile = true;
  };

 onTap(evt){
    this.slider.focus();
    if (this.slideNumber < (this.verses.length) - 1) {
      this.slideNumber = this.slideNumber + 1;
      this.slider.value = this.slideNumber;
      this.messagetoparent = this.slideNumber;
      this.sendMessage();
    }
  }

 onSwipeLeft(evt) {
    this.slider.focus();
    if (this.slideNumber < (this.verses.length) - 1) {
      this.slideNumber = this.slideNumber + 1;
      this.slider.value = this.slideNumber;
      this.messagetoparent = this.slideNumber;
      this.sendMessage();
    }
  }

  onSwipeRight(evt) {
    // alert('Swipe right!');
        this.slider.focus();

    if (this.slideNumber > 0) {
      this.slideNumber = this.slideNumber - 1;
         this.slider.value = this.slideNumber;
      this.messagetoparent = this.slideNumber;
      this.sendMessage();

    }
  }


}
