import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';

import { QrScannerComponent } from 'angular2-qrscanner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class QrCodeComponent implements OnInit {

  usuario: any = {
    name: ""
  }

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) { }


  @ViewChild(QrScannerComponent, { static: false })
  qrScannerComponent!: QrScannerComponent;
  ngOnInit(): void {
  
  }


  ngAfterViewInit(): void {
   
  }

  readQRCodeTable(): void {
    this.qrScannerComponent.getMediaDevices().then(devices => {
      console.log("devices",devices);
      const videoDevices: MediaDeviceInfo[] = [];
      for (const device of devices) {
        if (device.kind.toString() === 'videoinput') {
          videoDevices.push(device);
        }
      }
      if (videoDevices.length > 0) {
        let choosenDev;
        for (const dev of videoDevices) {
          if (dev.label.includes('front')) {
            choosenDev = dev;
            break;
          }
        }
        if (choosenDev) {
          this.qrScannerComponent.chooseCamera.next(choosenDev);
        } else {
          this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
        }
      }
    });

    this.qrScannerComponent.capturedQr.subscribe(mesa => {
      this.authService.verificaStatusMesa(mesa)
        .subscribe(response => {
          if (response.data[0].status_mesa === "LIVRE") {
            this.authService.alteraStatusMesaParaOcupado(mesa)
              .subscribe(sucesso => {
                this.authService.selectTable(mesa, this.usuario.name)
              },
                erro => {
                  this.toastr.error("Opa algo deu errado 😥")
                })

          } else {
            this.toastr.error("Essa mesa está ocupada 😐. Por favor, peça ajuda para um atendente.")
          }
        })
    });
  }
}
