import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { EmployeeModel } from './employee.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  formValue!: FormGroup
  employeeModelObj: EmployeeModel = new EmployeeModel()
  employeeData: any
  showadd!:boolean
  showupdate!:boolean

  constructor(private fb: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.fb.group({
      name: [''],
      email: [''],
      mobile: [''],
      salary: ['']
    })
    this.getAllEmployee()
  }

  clickaddemployee(){
    this.formValue.reset()
    this.showadd=true
    this.showupdate=false
  }



  postEmployeeDetails() {
    this.employeeModelObj.name = this.formValue.value.name
    this.employeeModelObj.email = this.formValue.value.email
    this.employeeModelObj.mobile = this.formValue.value.mobile
    this.employeeModelObj.salary = this.formValue.value.salary

    this.api.postEmployee(this.employeeModelObj).subscribe(res => {

      alert("ADDED SUCCESSFULLY")
      let ref = document.getElementById("cancel")
      ref?.click()
      this.formValue.reset()
      this.getAllEmployee()

    }, err => {
      alert("Something Went Wrong")
    })
  }

  getAllEmployee() {
    this.api.getEmployee().subscribe(res => {
      this.employeeData = res
    })
  }

  deleteEmployee(i: any) {
    this.api.deleteEmployee(i.id).subscribe(res => {
      alert("Employee Deleted")
      this.getAllEmployee()
    })
  }

  onEdit(row: any) {
    this.showadd=false
    this.showupdate=true
    
    this.employeeModelObj.id=row.id
    this.formValue.controls['name'].setValue(row.name)
    this.formValue.controls['email'].setValue(row.email)
    this.formValue.controls['mobile'].setValue(row.mobile)
    this.formValue.controls['salary'].setValue(row.salary)
  }
  updateEmployeeDetails(){
    this.employeeModelObj.name = this.formValue.value.name
    this.employeeModelObj.email = this.formValue.value.email
    this.employeeModelObj.mobile = this.formValue.value.mobile
    this.employeeModelObj.salary = this.formValue.value.salary
    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id).subscribe(res=>{
      alert("Updated Suceefully")
      let ref = document.getElementById("cancel")
      ref?.click()
      this.formValue.reset()
      this.getAllEmployee()
    })

  }


}
