import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-submissions',
  templateUrl: './view-submissions.component.html',
  styleUrls: ['./view-submissions.component.scss']
})
export class ViewSubmissionsComponent implements OnInit {
  submissions: any[] = [];
  formFields: any[] = [];
  fieldNames: string[] = [];

  ngOnInit(): void {
    const storedFields = localStorage.getItem('formFields');
    const storedSubmissions = localStorage.getItem('formSubmissions');

    this.formFields = storedFields ? JSON.parse(storedFields) : [];
    this.submissions = storedSubmissions ? JSON.parse(storedSubmissions) : [];

    this.fieldNames = this.formFields.map(f => f.name);
  }

  getFieldLabel(fieldName: string): string {
    const field = this.formFields.find(f => f.name === fieldName);
    return field ? field.label : fieldName;
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  getFieldValue(submission: any, fieldName: string): any {
    return submission[fieldName];
  }
}
