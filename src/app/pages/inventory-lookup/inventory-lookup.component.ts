import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inventory-lookup',
  templateUrl: './inventory-lookup.component.html',
  styleUrls: ['./inventory-lookup.component.css']
})
export class InventoryLookupComponent {
  username: string = '';
  userItems: any[] = [];
  progressValue: number = 0;
  totalItems: number = 0;

  constructor(private http: HttpClient) {}

  fetchItems() {
    const apiUrl = 'https://bitmatemediator.net/game/v1/items';
    debugger
    this.http.get<any[]>(apiUrl).subscribe((items: any[]) => {
      this.totalItems = items.length;
      this.userItems = items.map(item => ({ ...item, quantity: 0 }));
      // this.fetchUserInventory();
    });
  }

  // fetchUserInventory() {
  //   this.userItems.forEach((item, index) => {
  //     this.searchUserInventory(item, index);
  //   });
  // }

  // searchUserInventory(item: any, index: any) {
  //   let page = 1;
  //   const checkInventory = () => {
  //     const inventoryApi = `https://api.example.com/inventory/${item.id}?page=${page}&username=${this.username}`;
  //     this.http.get(inventoryApi).subscribe((response: any) => {
  //       if (response.users.length > 0) {
  //         const userRecord = response.users.find((u: any) => u.username === this.username);
  //         if (userRecord) {
  //           this.userItems[index].quantity = userRecord.quantity;
  //           this.updateProgress(index);
  //           return;
  //         }
  //       }
  //       if (response.hasMorePages) {
  //         page++;
  //         checkInventory();
  //       } else {
  //         this.updateProgress(index);
  //       }
  //     });
  //   };

  //   checkInventory();
  // }

  // updateProgress(index: any) {
  //   this.progressValue = index + 1;
  // }
}
