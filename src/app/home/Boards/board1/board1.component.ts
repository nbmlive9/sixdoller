import { Component } from '@angular/core';
import { AuthUserService } from '../../service/auth-user.service';

interface TreeNode {
  title: string;
  image: string;
  children?: TreeNode[];
}

@Component({
  selector: 'app-board1',
  templateUrl: './board1.component.html',
  styleUrls: ['./board1.component.scss']
})
export class Board1Component {
  data: TreeNode[] = []; // will hold trees for all boards
  errorMessage: string = '';

  constructor(private api: AuthUserService) {}

  ngOnInit(): void {
    this.getboardonedata();
  }

  getboardonedata() {
    this.api.GetBoard1().subscribe(
      (res: any) => {
        if (res.data?.length) {
          this.data = res.data.map((board: any) => this.buildTree(board));
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

  buildTree(bp: any): TreeNode {
    if (!bp) return { title: 'No Board', image: 'assets/logo.png', children: [] };

    const root: TreeNode = {
      title: bp.boardid,
      image: 'assets/gold.png',
      children: []
    };

    // Helper for member node
    const getNode = (member?: any): TreeNode => ({
      title: member?.regid || 'No User',
      image: member?.regid ? 'assets/gold.png' : 'assets/logo.png',
      children: []
    });

    // Level 1: team1
    const team1Nodes: TreeNode[] = [];
    for (let i = 0; i < 2; i++) {
      const member = bp.team1[i];
      const node: TreeNode = getNode(member);

      // Level 2: team2 under this team1 member
      const team2UnderMember = bp.team2.filter((t2: any) => t2.refid === member?.regid);
      node.children = [
        getNode(team2UnderMember[0]),
        getNode(team2UnderMember[1])
      ];

      team1Nodes.push(node);
    }

    root.children = team1Nodes;
    return root;
  }

  getChildren(node: TreeNode): TreeNode[] {
    return node.children || [];
  }
}
