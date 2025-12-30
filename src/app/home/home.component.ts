import { CommonModule } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-home',
  imports: [
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent {
  public showMap: WritableSignal<boolean> = signal<boolean>(false);
  public phrase: WritableSignal<string> = signal<string>('este regalo es para tu niña interior... quiero que te vuelva la ilusión.');

  public async showModal() {

    const { value: text } = await Swal.fire({
      title: "¡Buena suerte!",
      input: "textarea",
      width: 600,
      padding: "2em",
      color: "#716add",
      backdrop: `
        rgba(0,0,123,0.4)
        url("https://sweetalert2.github.io/images/nyan-cat.gif")
        left top
        no-repeat
      `,
      inputPlaceholder: "Escribe la frase de la tarjeta",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (this.format(value) === this.format(this.phrase())) {
            resolve();
          } else {
            resolve(" Casi 😅 Solo falta que coincidan.");
          }
        });
      },
      showCancelButton: true
    });

    if (text) {

      Swal.fire({
        title: "¡Buen trabajo!",
        text: "La frase es correcta.",
        icon: "success",
        showConfirmButton: false,
        timer: 3000
      });
      this.showMap.set(true);
    }

  }

  private format(t: string): string {
    return (t ?? '')
      .toLowerCase()
      .trim()
      .replace(/\r\n/g, '\n')
      .replace(/\s+/g, ' ');
  }

}
