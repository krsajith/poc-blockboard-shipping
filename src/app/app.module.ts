import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { FormsModule } from '@angular/forms';
import { BlockBoardComponent } from './block-board/block-board.component';
import { TaomishColorsComponent } from './taomish-colors/taomish-colors.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    BlockBoardComponent,
    TaomishColorsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
