import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { Instagram } from '@ionic-native/instagram/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  defaultSegment: string;
  segment: string;
  textArea: string;
  finalText: string;
  finalTextEdited: string;
  newTextArea: string;
  base64Image:any;
  newPrice:string;
  priceArea:string;
  instaCaption:string;

  constructor(private activatedRoute: ActivatedRoute, private clipboard: Clipboard,
              private instagram: Instagram , private camera: Camera) {
    this.defaultSegment = 'text';
    this.segment = 'text';
    this.textArea ='';
    this.priceArea ='';
   }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }
  clearAll(){
   this.newTextArea='';
   this.newPrice='';
   this.priceArea='';
   this.finalTextEdited='';
   this.finalText='';
   this.newTextArea='';
   this.instaCaption='';
   this.textArea ='';
   this.priceArea ='';
  }

  textChanged(textField: string) {
    this.finalText = this.editTextArea(textField);
    this.finalTextEdited = this.addFewDescription(this.finalText,this.newPrice);
    this.newTextArea = this.finalTextEdited;
  }
  priceChanged(price:string){
     this.newPrice = price;
     this.finalTextEdited = this.addFewDescription(this.finalText,price);
     this.newTextArea = this.finalTextEdited;
  }
  editTextArea(textField: string): string {
    var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
    var newText = textField.replace(regex, '');
    newText = newText.replace(/^\s*\n/gm, '');
    newText = newText.replace(/[*`~]/g, '');
    newText = newText.replace(/^\s+|\s+$/gm,'');
    return newText;
  }
  finalChanges(textField:string){
     this.newTextArea = textField;
  }
  copyToClipboard() {
    this.instaCaption = this.newTextArea;
    this.clipboard.copy(this.newTextArea).then(() => {
      alert('Copied to Clipboard');
    });
  }

  openGallery () {
    let cameraOptions:CameraOptions  = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,      
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: this.camera.EncodingType.JPEG,      
      correctOrientation: true
    }
   
    this.camera.getPicture(cameraOptions)
      .then(file_uri => {this.base64Image= "data:image/jpeg;base64," + file_uri;},
      err => alert(err));  
   }

   addFewDescription(text: string,price: string): string {
     var myVariable = '👇👇👇👇👇\n'+text+'.\n\n👉Price: '+price+'\/- Free Shipping✈️\n.\n👉For orders WhatsApp us at 9036410411 or click the link in bio.\n.\n👉Prices are fixed. 🚫No Bargaining🚫\n.\n👉Payment only through Google Pay\/Phonepe💰\n.\n👉🚫No Cash On Delivery🚫\n.\n👉Dont comment on any post for availability\/query. We usually don\'t monitor comments.\n.\n👉Follow @snappy_bags for Ladies Apparel\/Bags\/Makeup Essentials👩\n.\n👉Follow @karnataka_shop_ for Watches\/Shoes\/Clothing👨‍\n.\n👉No Returns\/Refund unless you received a defective product. (As a proof, unboxing video of the package is necessary)✅\n.\n👉Post Purchase: If you liked the product, share a pic and leave feedback😎\n.\n.\n.\n#musthavebags #clutches #bagsholic #purse #bagoftheday #clutch #bagslover #musthave #bags #clutchbag #handbags #trend #fashionista #bagsale #shopping #accessories #purses';
     return myVariable;
   }

   instaShare(){
     this.instagram.share(this.base64Image,this.newTextArea).then(()=> alert("shared"))
     .catch((error: any) => alert(error));;
   }

}
