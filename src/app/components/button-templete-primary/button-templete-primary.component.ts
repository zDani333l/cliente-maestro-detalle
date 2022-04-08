import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button-templete-primary',
  templateUrl: './button-templete-primary.component.html',
  styleUrls: ['./button-templete-primary.component.scss'],
})
export class ButtonTempletePrimaryComponent implements OnInit {
  @Input() txtButton = '';
  @Input() idBtn = '';
  @Input() stateButton: boolean = true;
  @Output() eventClickBtn = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  onClick() {
    this.eventClickBtn.emit();
  }
}
