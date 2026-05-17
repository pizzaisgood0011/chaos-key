import { Component } from "@angular/core";
import { PasswordGenerator } from "./components/password-generator/password-generator";

@Component({
  selector: 'app-root',
  imports: [PasswordGenerator],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  kofi_icon: string = "assets/icons/kofi-icon.png";

}
