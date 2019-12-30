import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Dialog } from 'primeng/dialog/dialog';
import Quagga from 'quagga';

@Component({
  selector: 'app-scan-dialog',
  templateUrl: './scan-dialog.component.html',
  styleUrls: ['./scan-dialog.component.css']
})
export class ScanDialogComponent implements OnInit {
  @Input() display: boolean;
  @Output() closed: EventEmitter<void> = new EventEmitter();
  @Output() codeDetected: EventEmitter<string> = new EventEmitter();

  private detectArea: HTMLElement;
  constructor() {}

  ngOnInit() {}
  onShow(dialog: Dialog) {
    setTimeout(() => {
      dialog.maximize();
    }, 10);
    this.display = true;
    console.log('start showDialog');
    this.startCapture(dialog);
  }
  onHide() {
    this.display = false;
    this.stopCapture();
    this.closed.emit();
  }
  private startCapture(dialog: Dialog) {
    console.log('start capture');
    // Quaggaの設定項目
    const config = {
      // カメラの映像の設定
      inputStream: {
        type: 'LiveStream',
        // カメラ映像を表示するHTML要素の設定
        target: '#camera-area',
        // バックカメラの利用を設定. (フロントカメラは"user")
        constraints: {
          height: 300,
          facingMode: 'environment'
        },
        size: 900,
        // 検出範囲の指定:
        area: { top: '0%', right: '0%', left: '0%', bottom: '30%' },
        singleChannel: false
      },
      // 解析するワーカ数の設定
      numOfWorkers: navigator.hardwareConcurrency || 4,
      // バーコードの種類を設定: ISBNは"ean_reader"
      decoder: { readers: ['ean_reader'] },
      locate: false
    };
    // show detect-mark
    this.detectArea = document.querySelector('#detect-area') as HTMLElement;
    this.detectArea.style.visibility = 'visible';

    Quagga.onDetected(result => {
      console.log('success:', result);
      const isbn = result.codeResult.code;
      console.log('isbn:', isbn);
      if (isbn.startsWith('978') && isbn.length === 13) {
        console.log('match!!!!!');
        this.codeDetected.emit(isbn);
        this.stopCapture();
        return;
      } else {
        console.log('no isbn');
      }
    });
    Quagga.onProcessed(result => {
      this.onProcessed(result);
    });
    Quagga.init(config, error => {
      if (!!error) {
        console.error(`Error: ${error}`, error);
        return;
      }
      setTimeout(() => {
        dialog.maximize();
      }, 10);
      // エラーがない場合は、読み取りを開始
      console.log('Initialization finished. Ready to start');
      Quagga.start();
    });
  }

  private onProcessed(result): void {
    const drawingCtx = Quagga.canvas.ctx.overlay;
    const drawingCanvas = Quagga.canvas.dom.overlay;

    if (result) {
      if (result.boxes) {
        drawingCtx.clearRect(
          0,
          0,
          parseInt(drawingCanvas.getAttribute('width'), 10),
          parseInt(drawingCanvas.getAttribute('height'), 10)
        );
        result.boxes
          .filter(box => {
            return box !== result.box;
          })
          .forEach(box => {
            Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
              color: 'green',
              lineWidth: 2
            });
          });
      }

      if (result.box) {
        Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
          color: '#00F',
          lineWidth: 2
        });
      }

      if (result.codeResult && result.codeResult.code) {
        Quagga.ImageDebug.drawPath(
          result.line,
          { x: 'x', y: 'y' },
          drawingCtx,
          { color: 'red', lineWidth: 3 }
        );
      }
    }
  }

  private stopCapture(): void {
    Quagga.stop();
    this.detectArea.style.visibility = 'hidden';
    this.display = false;
    this.closed.emit();
  }
}
