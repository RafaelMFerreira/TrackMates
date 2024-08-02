import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface Player {
  id: number;
  name: string;
  kills: {
    total: number;
    crustadon: number;
    magmadillo: number;
    timberfang: number;
    nightfang: number;
  };
}

interface KillGroup {
  range: string;
  players: Player[];
  total: number;

}

interface BossApi {
  baseUrl: string;
  bossKey: string;
  iconUrl: string;
}

// 'https://bitmatemediator.net/game/v1/killstats?valueid=5&time=monthly&page=1',
//  'https://bitmatemediator.net/game/v1/killstats?valueid=17&time=monthly&page=1',
//  'https://bitmatemediator.net/game/v1/killstats?valueid=18&time=monthly&page=1',
//  'https://bitmatemediator.net/game/v1/killstats?valueid=16&time=monthly&page=1'


@Component({
  selector: 'app-boss-tracker',
  templateUrl: './boss-tracker.component.html',
  styleUrls: ['./boss-tracker.component.css']
})

export class BossTrackerComponent {
  totalKills: number = 0;
  totalCrustadonKills: number = 0;
  totalMagmadilloKills: number = 0;
  totalTimberfangKills: number = 0;
  totalNightfangKills: number = 0;
  searchUsername: string = '';
  isSearchActive: boolean = false;

  killGroups: KillGroup[] = [];
  allPlayers: Map<number, Player> = new Map();
  openedTabs = new Set<string>();
  filteredPlayers = new Map<string, any[]>();

  bossApis: BossApi[] = [
    { baseUrl: 'https://bitmatemediator.net/game/v1/killstats?valueid=5&time=monthly', bossKey: 'crustadon', iconUrl: 'https://storage.googleapis.com/apes-f984d.appspot.com/Enemies/Crustadon.png' },
    { baseUrl: 'https://bitmatemediator.net/game/v1/killstats?valueid=18&time=monthly', bossKey: 'magmadillo', iconUrl: 'https://storage.googleapis.com/apes-f984d.appspot.com/Enemies/Magmadillo.png' },
    { baseUrl: 'https://bitmatemediator.net/game/v1/killstats?valueid=16&time=monthly', bossKey: 'timberfang', iconUrl: 'https://storage.googleapis.com/apes-f984d.appspot.com/Enemies/Timberfang.png' },
    { baseUrl: 'https://bitmatemediator.net/game/v1/killstats?valueid=17&time=monthly', bossKey: 'nightfang', iconUrl: 'https://storage.googleapis.com/apes-f984d.appspot.com/Enemies/Nightfang.png' },
  ];

  constructor(private http: HttpClient) {
    this.fetchAllData();
  }

  fetchAllData() {
    this.bossApis.forEach(api => this.fetchData(api, 1));
  }

  fetchData(api: BossApi, page: number) {
    const url = `${api.baseUrl}&page=${page}`;
    this.http.get<any[]>(url).subscribe(players => {
      if (players.length > 0) {
        players.forEach(player => {
          let playerEntry = this.allPlayers.get(player.id);
          if (!playerEntry) {
            playerEntry = {
              id: player.id,
              name: player.name,
              kills: { total: 0, crustadon: 0, magmadillo: 0, timberfang: 0, nightfang: 0 }
            };
            this.allPlayers.set(player.id, playerEntry);
          }
          playerEntry.kills[api.bossKey as keyof typeof playerEntry.kills] += player.value;
          playerEntry.kills.total += player.value;
        });
        this.totalKills = Array.from(this.allPlayers.values()).reduce((acc, p) => acc + p.kills.total, 0);
        this.setupGroups();
        this.fetchData(api, page + 1);
      }
    });
  }

  filterPlayerData() {
    this.openedTabs.clear();
    this.filteredPlayers.clear();
    if (this.searchUsername.trim() === '') {
      this.isSearchActive = false;
    } else {
      this.isSearchActive = true;
      this.killGroups.forEach(group => {
        const filtered = group.players.filter(player => player.name.toLowerCase().includes(this.searchUsername.toLowerCase()));
        if (filtered.length > 0) {
          this.openedTabs.add(group.range);
          this.filteredPlayers.set(group.range, filtered);
        }
      });
    }
  }

  getPlayersForGroup(groupRange: string): any[] {
    return this.isSearchActive ? this.filteredPlayers.get(groupRange) || [] : this.killGroups.find(group => group.range === groupRange)?.players || [];
  }

  setupGroups() {
    this.killGroups = this.groupPlayers(Array.from(this.allPlayers.values()));
  }

  groupPlayers(players: Player[]): KillGroup[] {
    const ranges = [
      { min: 1, max: 25, label: '1-25' },
      { min: 26, max: 100, label: '26-100' },
      { min: 100, max: 199, label: '100-199' },
      { min: 200, max: 299, label: '200-299' },
      { min: 300, max: 399, label: '300-399' },
      { min: 400, max: 499, label: '400-499' },
      { min: 500, max: 599, label: '500-599' },
      { min: 600, max: 699, label: '600-699' },
      { min: 700, max: 10000, label: '700+' },
    ];
    return ranges.map(range => {
      let filteredPlayers = players.filter(p => p.kills.total >= range.min && p.kills.total <= range.max);

      // Sort players in each group by total kills in descending order
      filteredPlayers.sort((a, b) => b.kills.total - a.kills.total);

      const totalKills = filteredPlayers.reduce((sum, p) => sum + p.kills.total, 0);
      return {
        range: range.label,
        players: filteredPlayers,
        total: totalKills,
      };
    });
  }
  getTotalKillsForBoss(bossKey: string): number {
    return Array.from(this.allPlayers.values()).reduce((sum, player) => sum + (player.kills[bossKey as keyof typeof player.kills] || 0), 0);
  }

  groupContainsPlayer(group: any, username: string): boolean {
    return group.players.some((player: { name: string; }) => player.name.toLowerCase() === username.toLowerCase());
  }

  resetSearch() {
    if (this.searchUsername.trim() === '') {
      this.isSearchActive = false; // Immediately deactivate search when input is cleared
    }
  }

  toggleTab(groupRange: string) {
    if (this.isSearchActive && !this.groupContainsPlayer({ range: groupRange }, this.searchUsername)) {
      return; // Prevent toggling if search is active and the group does not contain the player
    }
    if (this.openedTabs.has(groupRange)) {
      this.openedTabs.delete(groupRange);
    } else {
      this.openedTabs.add(groupRange);
    }
  }

  isTabOpen(groupRange: string): boolean {
    return this.openedTabs.has(groupRange); // Determine open state solely based on the openedTabs set
  }
}
