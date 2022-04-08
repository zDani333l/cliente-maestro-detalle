import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-buton-template-secondary',
  templateUrl: './buton-template-secondary.component.html',
  styleUrls: ['./buton-template-secondary.component.scss'],
})
export class ButonTemplateSecondaryComponent implements OnInit {
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
