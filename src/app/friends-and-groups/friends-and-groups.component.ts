import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'friends-and-groups',
  templateUrl: './friends-and-groups.component.html',
  styleUrls: ['./friends-and-groups.component.scss'],
})
export class FriendsAndGroupsComponent implements OnInit {

  user: any = new Object();
  groups: any[] = [];
  userProfile: any;
  friends: any[]= new Array()
  listFriends: any[]= new Array()
  group: String = "Joined Group"

  id = localStorage.getItem('userId');
  
  constructor(private auth: AuthService,
    private userService: UserService,
    private toastController: ToastController,
    private alertController: AlertController) { }

  ngOnInit() {
    this.fetchFriend();
    this.getUserProfile();
  }

  fetchFriend(){
    this.userService.getAcceptedFriends(this.id).subscribe(friend=> {
      this.user = friend;
      //console.log(this.user);
      this.getFriends(this.user)
      },
    err =>{
      console.log(err);
      return false;
    });
  }


  getFriends(list){
    for(let i=0; i<list.length; i++){
        if(list[i].recipient == this.id){
            this.userService.getAUser(list[i].requester).subscribe((profile:any) => {
                this.friends.push(profile);
                
                 }
            ); 
        }
        else{
            this.userService.getAUser(list[i].recipient).subscribe((profile:any) => {
                this.friends.push(profile);
                 }
            ); 
        }
         
    }
    
  }

  getUserProfile(){
    this.auth.getProfile().subscribe(profile => {
        this.userProfile = profile['user'];
        // console.log(this.userProfile.groups);
        if(this.userProfile.groups.length > 0)
            this.getGroups(this.userProfile.groups);
        },
      err =>{
        console.log(err);
        return false;
      });
  }

  getGroups(group){
    for(let i=0; i<group.length; i++){
      if(i ==3){
        return false;
      }
        this.userService.getGroup(group[i]).subscribe((data:any) => {
            if(data['success']){
                this.groups.push(data['group']);
            }
            else{
                console.log(data['msg']);
                return false;
              }
          
           }
        ); 
      
    }
    return;
  }

  deleteGroup(group) {
    let member = group.members;
    for (let i = 0; i < member.length; i++) {
      let id = localStorage.getItem('userId');
      if (member[i].memberId === id) {
        this.userService.removeGroupMember(group._id, member[i]._id).subscribe(data => {
          if (data['success']) {
            this.userService.removeGroupFromList(group._id).subscribe(user => {
              if (user['success']) {
                this.getUserProfile();
                this.showToast('You have unsubscribed from the group successfully')
                // this.toastr.success('Successfully.', 'You have unsubscribed from the group', { timeOut: 3000 });

              }
              else {
                this.presentAlert('Error', 'We could not remove this group from your list of groups');
                // this.toastr.error('We could not remove this group from your list of groups', 'Oops', { timeOut: 3000 });
                return false;
              }
            })
          }
          else {
            this.presentAlert('Error', 'We could not unsubscribe you from the list. Try Again later');
            // this.toastr.error('We could not unsubscribe you from the list. Try Again later', 'Oops', { timeOut: 3000 });
            return false;
          }
        })
      }

    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    toast.present();
  }

  async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: ['OK']
		})

		await alert.present()
	}

}
