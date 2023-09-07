import { NgModule } from "@angular/core";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatDialogModule } from "@angular/material/dialog";
const data:any=[MatToolbarModule,MatButtonModule,MatIconModule,MatCardModule,MatListModule,MatProgressSpinnerModule,MatFormFieldModule,MatInputModule,MatDialogModule];
@NgModule({
    imports:data,
    exports:data
})
export class MaterialModule{

}