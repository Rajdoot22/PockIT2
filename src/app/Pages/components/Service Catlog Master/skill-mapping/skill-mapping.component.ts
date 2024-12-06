import { Component, Input } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ApiServiceService } from 'src/app/Service/api-service.service';

export class Data {
  SKILL_ID: any;
  SKILL_NAME: any;
  IS_ACTIVE: boolean = true;
}


@Component({
  selector: 'app-skill-mapping',
  templateUrl: './skill-mapping.component.html',
  styleUrls: ['./skill-mapping.component.css']
})
export class SkillMappingComponent {

  // Loading
  isSpinning;
  isLoading = true;
  skillLoading =false;
  btnLoading =false;
  loadingRecords = false;

//DataList
  skillData: any;
  dataList: any = [];
  addData: any = new Data();
  mappedSkillIds: number[] = [];
  filteredSkillData:any=[];

  //Page Size and Sort
  pageIndex = 1;
  pageSize = 10;
  sortValue: string = "desc";
  sortKey: string = "SKILL_NAME";

  ngOnInit(): void {
    this.getSkillData();
  }

  @Input() data;
  @Input() drawerVisible: boolean = false;
  @Input() drawerClose: any = Function;

  constructor(
    private message: NzNotificationService,
    private api: ApiServiceService,
    private modal: NzModalService
  ) {}




  add(skillMappingForm: any): void {
    if (!this.addData.SKILL_ID || this.addData.SKILL_ID.length === 0) {
      this.message.error("Please select at least one Skill.", "");
      return;
    }

    this.btnLoading = true;

    let duplicateFound = false; // Flag to track duplicate entries

    // Iterate over selected SKILL_IDs and add them to the table
    this.addData.SKILL_ID.forEach((id: number) => {
      const selectedSkill = this.skillData.find((skill) => skill.ID === id);

      // Check if the skill already exists
      const exists = this.dataList.some((item) => item.SKILL_ID === id);

      if (!exists) {
        const entry = {
          SKILL_ID: id,
          SKILL_NAME: selectedSkill?.NAME,
          IS_ACTIVE: true, // Default IS_ACTIVE
        };
        this.dataList.push(entry);
      } else {
        duplicateFound = true; // Mark as duplicate if exists
      }
    });

    // Update the data list reference
    this.dataList = [...this.dataList];

    // Update filtered skills
    this.updateFilteredSkillData();

    // Display a message for duplicate skills
    if (duplicateFound) {
      this.message.warning("Some skills are already present in the list.", "");
    }

    // Reset form and data
    this.addData.SKILL_ID = null;
    this.reset(skillMappingForm);

    this.message.success("Skills added successfully.", "");
    this.btnLoading = false;
  }


  Cancel() {}

  reset(skillMappingForm: any): void {
    this.addData.SKILL_ID = null;
    if (skillMappingForm) {
      skillMappingForm.form.markAsPristine();
      skillMappingForm.form.markAsUntouched();
    }
  }


  close() {
    this.drawerClose();
  }

  sort(params: NzTableQueryParams) {
    this.loadingRecords = true;
    const { pageSize, pageIndex, sort } = params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || 'id';
    const sortOrder = (currentSort && currentSort.value) || 'desc';
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;

    if (this.pageSize != pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
    }

    if (this.sortKey != sortField) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
    }

    this.sortKey = sortField;
    this.sortValue = sortOrder;
    this.getMappedData();

  }



  save() {
    this.isSpinning = true;

    // Proceed with saving data if all entries are valid
    console.log("this.dataList", this.dataList);

    const dataToSave = this.dataList.map((data) => ({
      SKILL_ID: data.SKILL_ID,
      IS_ACTIVE: data.IS_ACTIVE,
    }));
    console.log("dataToSave", dataToSave);

    // Call the API to save the task mapping data
    this.api.mapServiceSkillMapping(this.data.ID, 1, dataToSave).subscribe(
      (successCode) => {
        if (successCode["code"] === 200) {
          this.message.success(
            "Territory Successfully Mapped to the Service Catalogue.",
            ""
          );

          // Update the skill data to exclude already added skills
          this.updateFilteredSkillData();

          this.isSpinning = false;
          this.drawerClose();
        } else {
          this.message.error("Failed to Map Task to the Service Catalogue", "");
        }
        this.isSpinning = false;
      },
      () => {
        this.isSpinning = false;
        this.message.error("Something Went Wrong.", "");
      }
    );
  }

  getMappedData() {
    this.loadingRecords = true;
    let sort: string;
    try {
      sort = this.sortValue.startsWith("a") ? "asc" : "desc";
    } catch (error) {
      sort = "";
    }

    this.api
      .getServiceSkillMappedData(
        0,
        0,
        this.sortKey,
        sort,
        "AND SERVICE_ID =" + this.data.ID
      )
      .subscribe(
        (data) => {
          if (data["code"] == 200) {
            this.dataList = data["data"];
            console.log("this.mappedSkillIds", this.mappedSkillIds);

            // Update the filtered skills to exclude mapped skills
            this.updateFilteredSkillData();

            this.loadingRecords = false;
          } else {
            this.dataList = [];
            this.mappedSkillIds = [];
            this.loadingRecords = false;
            this.message.error("Failed To Get Mapping Data", "");
          }
        },
        () => {
          this.loadingRecords = false;
          this.message.error("Something Went Wrong", "");
        }
      );
  }

  updateFilteredSkillData() {
    // Filter out skills that are already in the table
    const selectedSkillIds = this.dataList.map((item) => item.SKILL_ID);

    this.filteredSkillData = this.skillData.filter(
      (skill) => !selectedSkillIds.includes(skill.ID)
    );
  }

  getSkillData(): void {
    this.skillLoading = true;
    this.api.getSkillData(0, 0, "", "", "").subscribe(
      (data) => {
        if (data["code"] === 200) {
          this.skillData = data["data"];
          this.updateFilteredSkillData(); // Filter options initially
          this.skillLoading = false;
        } else {
          this.skillData = [];
          this.filteredSkillData = [];
          this.skillLoading = false;
          this.message.error("Failed to get Skill Data", "");
        }
      },
      () => {
        this.skillLoading = false;
        this.message.error("Something went wrong", "");
      }
    );
  }


}
