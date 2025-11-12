import { Component } from '@angular/core';
import { AuthUserService } from '../../service/auth-user.service';
interface TreeNode {
  title: string;
  image: string;
  children?: TreeNode[];
}
@Component({
  selector: 'app-board14',
  templateUrl: './board14.component.html',
  styleUrls: ['./board14.component.scss']
})
export class Board14Component {
  data: TreeNode[] = [];
            bp: any;
            errorMessage: string = '';
          
            constructor(private api: AuthUserService) {}
          
            ngOnInit(): void {
              this.getboardonedata();
            }
          
            getboardonedata() {
              this.api.GetBoard14().subscribe(
                (res: any) => {
                  // console.log('board', res);
                  this.bp = res.data?.[0]; // ✅ access safely
                  if (this.bp) {
                    this.buildTree(); // ✅ now bp is defined
                  } else {
                    this.errorMessage = 'No data available for organization chart.';
                  }
                },
                (error: any) => {
                  this.errorMessage =
                    error?.error?.message || 'An error occurred while fetching data.';
                }
              );
            }
          
            buildTree() {
            if (!this.bp) return;
          
            // Root node
            const root: TreeNode = {
              title: this.bp.boardid,
              image: 'assets/gold.png',
              children: []
            };
          
            // Helper to get user or placeholder
            const getNode = (member?: any): TreeNode => ({
              title: member ? member.regid : 'No User',
               image: member?.regid ? 'assets/gold.png' : 'assets/logo.png',
              children: []
            });
          
            // Level 1: team1 (2 users max)
            const team1Nodes: TreeNode[] = [];
            for (let i = 0; i < 2; i++) {
              const member = this.bp.team1[i];
              const node: TreeNode = getNode(member);
          
              // Level 2: assign team2 members under this team1 node
              const team2UnderMember = this.bp.team2.filter(
                (t2: any) => t2.refid === member?.regid
              );
          
              // Each team1 node can have 2 children (from team2)
              node.children = [
                getNode(team2UnderMember[0]),
                getNode(team2UnderMember[1])
              ];
          
              team1Nodes.push(node);
            }
          
            root.children = team1Nodes;
          
            this.data = [root];
          }
          
          
            getChildren(node: TreeNode): TreeNode[] {
              return node.children || [];
            }

}
