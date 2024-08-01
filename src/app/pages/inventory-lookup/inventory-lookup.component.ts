import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-inventory-lookup',
  templateUrl: './inventory-lookup.component.html',
  styleUrls: ['./inventory-lookup.component.css']
})
export class InventoryLookupComponent {
  username: string = '';
  userItems: any[] = [];
  itemsChecked: number = 0;
  progressValue: number = 0;
  totalItems: number = 0;
  delayBetweenRequests = 50;
  itemsVisible: boolean = false;


  constructor(private http: HttpClient) {}

  fetchItems() {
    this.itemsChecked = 0;
    this.itemsVisible = false
    const apiUrl = 'https://bitmatemediator.net/game/v1/items';
    this.http.get<{[key: string]: Item}>(apiUrl).subscribe(items => {
      const itemList = Object.values(items);
      this.totalItems = itemList.length;
      this.userItems = itemList.map(item => ({ ...item, quantity: 0 }));
      this.fetchUserInventory();
    });
  }

  fetchUserInventory() {
    this.userItems.forEach((item, index) => {
      setTimeout(() => this.searchUserInventory(item, index), index * this.delayBetweenRequests);
    });
  }

  searchUserInventory(item: Item, index: number) {
    let page = 0;
    const maxPages = 10;

    const checkInventory = () => {
      if (page > maxPages) {
        this.updateProgress(index);
        return;
      }

      const inventoryApi = `https://bitmatemediator.net/game/v1/topitems/${item.id}?page=${page}`;
      this.http.get<any[]>(inventoryApi).subscribe(response => {
        const userRecord = response.find(u => u.name.toLowerCase() === this.username.toLowerCase());
        if (userRecord) {
          this.userItems[index].quantity = userRecord.amount;
          this.updateProgress(index);
          return;
        }
        if (response.length === 0) {
          this.updateProgress(index);
        } else {
          page++;
          setTimeout(checkInventory, this.delayBetweenRequests);
        }
      }, error => {
        console.error('Failed to fetch data:', error);
        this.updateProgress(index);
      });
    };

    checkInventory();
  }

  updateProgress(index: number) {
    this.itemsChecked += 1;
    this.progressValue = Math.round(((this.itemsChecked) / this.totalItems) * 100);
    if (this.progressValue === 100) {
      this.itemsVisible = true;
    }
  }
}
