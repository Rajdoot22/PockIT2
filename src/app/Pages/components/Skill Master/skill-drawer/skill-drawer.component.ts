import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SkillMasterData } from 'src/app/Pages/Models/SkillMasterData';
import { ApiServiceService } from 'src/app/Service/api-service.service';
import { CommonFunctionService } from 'src/app/Service/CommonFunctionService';

@Component({
  selector: 'app-skill-drawer',
  templateUrl: './skill-drawer.component.html',
  styleUrls: ['./skill-drawer.component.css']
})
export class SkillDrawerComponent {



  isSpinning = false;
  isOk = true;

  ngOnInit(): void
  {


  }

  public commonFunction = new CommonFunctionService();
  @Input() data: any = SkillMasterData;
  @Input()
  drawerVisible: boolean = false;
  @Input() drawerClose: any = Function;

  constructor(
    private message: NzNotificationService,
    private api: ApiServiceService
  ) {}

  resetDrawer(Skillmaster: NgForm) {
    this.data = new SkillMasterData();
    Skillmaster.form.markAsPristine();
    Skillmaster.form.markAsUntouched();
  }

  techData : any =[];


  skillData: any = [];

  save(addNew: boolean, Skillmaster: NgForm): void {
    this.isSpinning = false;
    this.isOk = true;
    if (
          (this.data.NAME == '' ||
          this.data.NAME == null ||
          this.data.NAME == undefined) &&
          (this.data.DESCRIPTION == '' ||
          this.data.DESCRIPTION == null ||
          this.data.DESCRIPTION == undefined)
    ) {
      this.isOk = false;
      this.message.error('Please Fill All The Required Fields ', '');
    }    else if (
      this.data.NAME == null ||
      this.data.NAME == undefined ||
      this.data.NAME == ''
    ) {
      this.isOk = false;
      this.message.error(' Please Enter Skill Name', '');
    }
    else if (
      this.data.DESCRIPTION == null ||
      this.data.DESCRIPTION == undefined ||
      this.data.DESCRIPTION.trim() == ''
    ) {
      this.isOk = false;
      this.message.error(' Please Enter Description', '');
    }

    if (this.isOk) {
      this.isSpinning = true;
      {
        if (this.data.ID) {
          this.api.updateSkill(this.data).subscribe((successCode: any) => {
            if (successCode.code == 200) {
              this.message.success('Skill Updated Successfully', '');
              if (!addNew) this.drawerClose();
              this.isSpinning = false;
            } else {
              this.message.error('Skill Updation Failed', '');
              this.isSpinning = false;
            }
          });
        } else {
          this.api.createSkill(this.data).subscribe(
            (successCode: any) => {
              if (successCode.code === 200) {
                this.message.success('Skill Created Successfully', '');
                if (!addNew) {
                  this.drawerClose();
                } else {
                  this.data = new SkillMasterData();
                  this.resetDrawer(Skillmaster);
                }
              } else {
                this.message.error('Skill Creation Failed', '');
              }
              this.isSpinning = false;
            },
            (error) => {
              this.message.error('An error occurred while creating the skill.', '');
              this.isSpinning = false;
            }
          );
        }
      }
    }
  }

  close() {
    this.drawerClose();
  }

}
