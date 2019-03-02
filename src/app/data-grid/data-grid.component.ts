import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { HttpHeaders,HttpClient,HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder,Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit {

  constructor(private http: HttpClient,private fb: FormBuilder) { }

  searchForm: FormGroup;
  formSubmitted=false;
  data:any;
  totalRecords = 0
  tableHeaders=[];
  pageNum=1;
  dataSearched=false;
  searchParams='';
  sortParam='';
  rowsPerPage =10;
  searchHeader: String;
  dataError=''

  ngOnInit() {
    this.createForm();
    this.fetchData();
  }
  
  createForm(){    
    this.searchForm = this.fb.group({
      searchHeader: 'First Name',
      searchText: ['', [Validators.required]] //handle validations for search field
    });
  }
 
  //get data from server 
  fetchData(){
    //const options = { params: new HttpParams().set('page',this.pageNum.toString()).set('rowsPerPage','10').set('sort','dsc') }
   //http param options
    const options = {
      params:{'page':this.pageNum.toString(),'rowsPerPage':this.rowsPerPage.toString(),'sortHeader':this.sortParam,'search':this.searchParams}
    };
    const tableData: Observable<any> = this.http.get(`http://localhost:3000/data`,options)
        tableData.subscribe((tData)=>{  //handle data received from server
        this.totalRecords=tData["totalRecords"] //total records fetched
        this.data = tData["recordsData"];
        this.tableHeaders= Object.keys( tData["recordsData"][0]); //forming headers array for table headers
      },
      error =>{ this.dataError=error.statusText}) //handle error from server
  }

  //sorting table data
  sortData(e:any){
    if(this.sortParam=='') this.sortParam=e.target.innerHTML //toggle between sort and unsort
    else this.sortParam=''        
    this.pageNum=1;
    this.fetchData()
  }

   //search table data using searchform fields
  searchData(){
    this.formSubmitted = true;
        // stop here if form is invalid
      if (this.searchForm.invalid) {
          return;
      }
      this.searchParams=JSON.stringify(this.searchForm.value);      
      this.dataSearched=true;      
      this.pageNum=1;
      this.fetchData();
  }
  
  resetSearch(){
    this.dataSearched=false;
    this.searchParams='';
    this.searchForm.reset({ //reset all form data
      searchHeader: 'First Name',
      searchText: ''
    })
    this.fetchData()
  }

  //page count select option changed
  pageCountChange (event: any) {
    this.rowsPerPage = event.target.value;           
    this.pageNum=1;
    this.fetchData();
  }

  //page num text field changed
  pageNumChange (event: any) {
    this.pageNum = event.target.value;
    this.fetchData();
  }

  //left arrow page button clicked
  getLeftPage(){
    this.pageNum--;
    this.fetchData();
  }
  //right arrow page button clicked
  getRightPage(){
    this.pageNum++;
    this.fetchData();
  }

}
