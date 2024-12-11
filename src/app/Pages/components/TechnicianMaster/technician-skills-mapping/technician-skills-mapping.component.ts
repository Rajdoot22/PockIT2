import { CdkDropListGroup } from "@angular/cdk/drag-drop";
import { DatePipe } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { ApiServiceService } from "src/app/Service/api-service.service";
export class Data {
  SKILL_ID: any = [];
  SKILL_NAME: string;
  IS_ACTIVE: boolean = true;
}
@Component({
  selector: "app-technician-skills-mapping",
  templateUrl: "./technician-skills-mapping.component.html",
  styleUrls: ["./technician-skills-mapping.component.css"],
})
export class TechnicianSkillsMappingComponent {
  @Input() data;
  @Input() drawerClose: any = Function;
  @Input() drawerVisible: boolean = false;
  isSpinning = false;
  datalist1: any[] = [];
  TechnicianData: any[] = [];
  searchText: string = "";
  isSkillSpinning = false;
  originalTechnicinanData: any[] = [];
  constructor(
    private message: NzNotificationService,
    private api: ApiServiceService,
    private datePipe: DatePipe // private modal: NzModalService
  ) {}
  ngOnInit(): void {
    this.getSkillData();
    this.getSkillDataforMapping();
  }
  keyup() {
    if (this.searchText.length >= 3) {
      this.searchTechnician(this.data);
    } else if (this.searchText.length == 0) {
      this.searchTechnician(this.data);
    }
  }

  searchTechnician(data: any) {
    console.log("data", data);

    this.isSpinning = true;
    console.log("this.isSpinning", this.isSpinning);

    if (data !== null && data.trim() !== "") {
      this.datalist1 = this.TechnicianData.filter((user) => {
        return user.NAME.toLowerCase().includes(this.searchText.toLowerCase());
      });

      this.isSpinning = false;

      this.TechnicianData = this.datalist1.slice();
    } else {
      this.isSpinning = false;
      this.TechnicianData = [...this.originalTechnicinanData];
    }
  }

  save() {
    this.isSpinning = true;

    // Proceed with saving data if all entries are valid

    const dataToSave = this.SkillsMappingdata.filter(
      (data) => data.IS_ACTIVE === true || data.IS_ACTIVE == "1"
    ).map((data) => ({
      SKILL_ID: data.SKILL_ID,
      SKILL_LEVEL: data.SKILL_LEVEL,
      IS_ACTIVE:
        data.IS_ACTIVE == null ||
        data.IS_ACTIVE == false ||
        data.IS_ACTIVE == undefined
          ? 0
          : 1,
    }));
    console.log("dataToSave", dataToSave);

    this.api.addskillsTeachniacianMapping(this.data.ID, dataToSave).subscribe(
      (successCode) => {
        if (successCode["code"] === 200) {
          this.message.success(
            "Technican Successfully Mapped to the Skill.",
            ""
          );
          this.isSpinning = false;
          this.drawerClose();
        } else {
          this.message.error("Failed to Map Technician to the Skills", "");
        }
        this.isSpinning = false;
      },
      () => {
        this.isSpinning = false;
        this.message.error("Something Went Wrong.", "");
      }
    );
  }
  close() {
    this.drawerClose();
  }
  allSelected = false;
  tableIndeterminate: boolean = false;
  SkillsMappingdata: any[] = [];
  selectedSkills: any[] = [];

  skilldata: any[];
  saveData: any = new Data();
  issaveSpinning = false;

  add(technicianmaster: NgForm): void {
    if (
      this.saveData.SKILL_ID == 0 ||
      this.saveData.SKILL_ID == undefined ||
      this.saveData.SKILL_ID == null
    ) {
      this.message.error("Please select Skill.", "");
      return;
    }

    this.issaveSpinning = true;

    // Find the selected skill name
    const selectedSkill = this.skilldata.find(
      (skill) => skill.ID === this.saveData.SKILL_ID
    )?.NAME;

    if (!selectedSkill) {
      this.message.error("Invalid Skill selection.", "");
      this.issaveSpinning = false;
      return;
    }

    console.log("selectedSkill", selectedSkill);
    console.log("this.saveData.PINCODE_ID", this.saveData.PINCODE_ID);
    console.log("STATE_ID", this.saveData.STATE_ID);

    // Add a single entry to the table (adjust if multiple skills need handling)
    const entry = {
      SKILL_NAME: selectedSkill,
      SKILL_ID: this.saveData.SKILL_ID,
      IS_ACTIVE: true, // Default status
    };

    // Prevent duplicate entries
    const exists = this.SkillsMappingdata.some(
      (item) => item.SKILL_ID === entry.SKILL_ID
    );
    if (!exists) {
      this.SkillsMappingdata.push(entry);
    }
    console.log("entry", entry);
    this.SkillsMappingdata = [...this.SkillsMappingdata];

    // Reset the inputs
    console.log("data", this.SkillsMappingdata);
    //console.log("HHH", this.TechnicianData);

    this.resetDrawer(technicianmaster);

    // Notify success
    this.message.success("Skill added successfully.", "");
    this.issaveSpinning = false;
  }

  resetDrawer(technicianmaster: NgForm) {
    this.saveData.SKILL_ID = null;
    technicianmaster.form.markAsPristine();
    technicianmaster.form.markAsUntouched();
  }
  getSkillData() {
    const technicianId = this.data.ID;

    if (!technicianId) {
      this.message.error("Invalid Technician ID", "");
      return;
    }
    this.api.getSkillData(0, 0, "", "", "").subscribe(
      (data) => {
        if (data["code"] == 200) {
          this.skilldata = data["data"];
        } else {
          this.skilldata = [];
          this.message.error("Failed To Get Skill Data", "");
        }
      },
      () => {
        this.message.error("Something Went Wrong", "");
      }
    );
  }
  getSkillDataforMapping() {
    this.api
      .getTechnicianSkillData(0, 0, "", "", "AND TECHNICIAN_ID=" + this.data.ID)
      .subscribe(
        (data) => {
          if (data["code"] == 200) {
            this.SkillsMappingdata = data["data"];
          } else {
            this.SkillsMappingdata = [];
            this.message.error("Failed To Get Skill Data", "");
          }
        },
        () => {
          this.message.error("Something Went Wrong", "");
        }
      );
  }
}
