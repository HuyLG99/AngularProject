import { CustomerService } from './../shared/customer.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  constructor(public customerService: CustomerService) { }
  customerArray = [];
  showDeletedMessage: boolean;
  searchText: string = "";

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe
    (
      list =>
      {
        this.customerArray = list.map(item =>
          {
            return  {
              $key: item.key,
              ...item.payload.val()
            };
          });
      }
    );
  }

  onDelete($key) {
    if (confirm('Are you sure to delete this record ?')) {
      this.customerService.deleteCustomer($key);
      this.showDeletedMessage = true;
      setTimeout(() => this.showDeletedMessage = false, 3000);
    }
  }


  filterCondition(customer) {
    return customer.fullName.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1;
    
  }

}

