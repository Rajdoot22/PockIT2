import { HttpErrorResponse } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NzNotificationService } from "ng-zorro-antd/notification";

import { ApiServiceService } from "src/app/Service/api-service.service";
@Component({
  selector: "app-app-language-translation",
  templateUrl: "./app-language-translation.component.html",
  styleUrls: ["./app-language-translation.component.css"],
})
export class AppLanguageTranslationComponent {
  @Input() data: any;
  @Input() drawerClose!: () => void;
  ngOnInit() {
    this.getJsondata();
    //this.getJsondata1();
  }
  Traslationlanguage: any[] = [];
  isSpinning = false;
  isSpinning1 = false;
  loadingRecords = false;
  pageSize = 10;
  sortKey: string = "NAME";
  sortValue: string = "desc";
  totalRecords = 1;
  pageIndex = 1;

  close() {
    this.drawerClose();
  }
  constructor(
    private api: ApiServiceService,
    private message: NzNotificationService
  ) {}
  DRAFT_JSON_URL: any;

  array: any = [];
  datalist: any = [];

  data1: any[] = [];

  getJsondata() {
    if (this.data && this.data.ID) {
      this.api.getDefalutJson(0, 0, "", "", "AND ID=" + this.data.ID).subscribe(
        (data) => {
          if (data["code"] === 200) {
            // Extract data
            const defaultJson = data["DEAFULT_JSON"] || [];
            const translationData = data["data"] || [];
            // const selectedLanguage =
            //   translationData.length > 0
            //     ? translationData[0].NAME // Selected language name
            //     : "English"; // Default to English if no language is selected

            // Prepare data for the selected language
            this.datalist = defaultJson.map((item: any) => ({
              KEY: item.KEY,
              ENGLISH: item.ENGLISH,
              TRANSLATION: item[this.data.NAME.toUpperCase()], // Use the selected language's translation, fallback to English
            }));

            console.log("this.datalist", this.datalist);

            // this.data.NAME = selectedLanguage; // Set the selected language dynamically for display
          } else {
            this.datalist = [];
            this.message.error("Failed To Load Json Data...", "");
          }
        },
        () => {
          this.message.error("Something Went Wrong...", "");
        }
      );
    }
  }

  TRANSLATION: any;
  // Utility method to get the keys of the first object in DEAFULT_JSON
  getKeys(obj: any) {
    // Check if the object is defined and not null
    return obj ? Object.keys(obj) : [];
  }

  resetDrawer(LanguageDrawer: NgForm) {
    this.data;
    LanguageDrawer.form.markAsPristine();
    LanguageDrawer.form.markAsUntouched();
  }
  isOk = true;

  save(addNew: boolean, LanguageDrawer: NgForm): void {
    this.isSpinning = true;
    // Prepare the payload in the required format (direct array of objects)
    const payload = {
      LANGUAGE_ID: this.data.ID,
      LANGUAGE: this.data.NAME,
      DEAFULT_JSON: this.datalist.map((item: any) => ({
        KEY: item.KEY,
        ENGLISH: item.ENGLISH,
        MARATHI: item.TRANSLATION || "", // Using the TRANSLATION field as MARATHI
      })),
    };
    console.log("Payload to save:", payload); // Debugging: Check the final payload format

    // Call the API to save data

    this.api.createTranslationLanguageData(payload).subscribe(
      (successCode: any) => {
        if (successCode.code === 200) {
          this.message.success(
            "Language Translation data saved in draft successfully.",
            ""
          );
          if (!addNew) {
            this.drawerClose();
          } else {
            this.resetDrawer(LanguageDrawer);
            this.api.getAppLanguageData(0, 0, "", "", "").subscribe(
              (data) => {
                if (data["code"] === "200") {
                } else {
                  this.message.error("Server Not Found.", "");
                }
              },
              () => {}
            );
          }
          this.isSpinning = false;
        } else {
          this.message.error("Failed to save language data in draft.", "");
          this.isSpinning = false;
        }
      },
      () => {
        this.message.error("Something Went Wrong...", "");
        this.isSpinning = false;
      }
    );

    //............................
  }

  save1(addNew: boolean, LanguageDrawer: NgForm): void {
    this.isSpinning = false;
    this.isOk = true;

    //Check if all translations are filled
    if (
      !this.datalist.every(
        (item: any) => item.TRANSLATION && item.TRANSLATION.trim() !== ""
      )
    ) {
      this.isOk = false;
      this.message.error("Please Fill All The Required Fields", "");
      return;
    }

    if (this.isOk) {
      this.isSpinning = true;

      // Build the DEAFULT_JSON structure
      const payload = {
        LANGUAGE_ID: this.data.ID,
        LANGUAGE: this.data.NAME,
        DEAFULT_JSON: this.datalist.map((item: any) => ({
          KEY: item.KEY,
          ENGLISH: item.ENGLISH,
          MARATHI: item.TRANSLATION || "", // Using the TRANSLATION field as MARATHI
        })),
      };

      console.log("Payload to be saved:", payload); // Debugging: Check the final structure

      this.api.SaveTranslationLanguageData(payload).subscribe(
        (successCode: any) => {
          if (successCode.code === 200) {
            this.message.success(
              "Language Translation data saved successfully.",
              ""
            );
            if (!addNew) {
              this.drawerClose();
            } else {
              this.resetDrawer(LanguageDrawer);
              this.api.getAppLanguageData(0, 0, "", "", "").subscribe(
                (data) => {
                  if (data["code"] === "200") {
                  } else {
                    this.message.error("Server Not Found.", "");
                  }
                },
                () => {}
              );
            }
            this.isSpinning = false;
          } else {
            this.message.error("Failed to save language data ", "");
            this.isSpinning = false;
          }
        },
        () => {
          this.message.error("Something Went Wrong...", "");
          this.isSpinning = false;
        }
      );
    }
  }
}
