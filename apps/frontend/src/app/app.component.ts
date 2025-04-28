import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RouterOutlet } from "@angular/router";
import { MessageModule } from "primeng/message";
import { ListboxModule } from "primeng/listbox";
import { CardModule } from "primeng/card";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { DataService } from "./services/data.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    MessageModule,
    ListboxModule,
    CardModule,
    ProgressSpinnerModule,
    ButtonModule,
    DialogModule,
    InputTextModule
  ],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [DataService],
})
export class AppComponent implements OnInit {
  data: { message: string; items: string[] }[] = [];
  loading = true;
  error: string | null = null;
  selectedMessage: string | null = null;
  selectedItem: string | null = null;

  displayAddDialog = false;
  addDataForm: FormGroup;
  submitting = false;

  constructor(private dataService: DataService, private fb: FormBuilder) {
    this.addDataForm = this.fb.group({
      message: ['', Validators.required],
      items: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.error = null;

    this.dataService.getData().subscribe({
      next: (response) => {
        this.data = Array.isArray(response) ? response : [response];
        this.loading = false;
      },
      error: (err) => {
        this.error = "Failed to load data from the server. Please try again later.";
        this.loading = false;
      },
    });
  }

  refreshData() {
    this.fetchData();
  }

  getSelectedItems(): string[] {
    const selectedGroup = this.data.find(group => group.message === this.selectedMessage);
    return selectedGroup ? selectedGroup.items : [];
  }

  get messageOptions(): string[] {
    return this.data.map(group => group.message);
  }

  showAddDialog() {
    this.addDataForm.reset();
    this.displayAddDialog = true;
  }

  hideAddDialog() {
    this.displayAddDialog = false;
  }

  saveData() {
    if (this.addDataForm.invalid) return;
  
    this.submitting = true;
  
    const formValue = this.addDataForm.value;
  
    // Split the comma-separated string into an array of strings (NOT numbers)
    const itemsArray = formValue.items
      .split(',')
      .map((item: string) => item.trim())
      .filter((item: string) => item !== "");  // Remove empty items
  
    // Create the correct payload
    const newData = {
      message: formValue.message,
      items: itemsArray    
    };
  
    this.dataService.saveData(newData).subscribe({
      next: () => {
        this.submitting = false;
        this.hideAddDialog();
        this.refreshData();
      },
      error: () => {
        this.submitting = false;
        this.error = "Failed to save data. Please try again later.";
      }
    });
  }
  

}