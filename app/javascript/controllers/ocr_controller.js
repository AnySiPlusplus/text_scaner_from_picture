import { Controller } from '@hotwired/stimulus';
import Tesseract from 'tesseract.js';

export default class extends Controller {
  static targets = ['file', 'image_description'];
  connect() {
    console.log('Hello, Stimulus!', this.element);
  }

  upload(event) {
    event.preventDefault();

    const file = this.fileTarget.files[0];
    const reader = new FileReader();

    const postLangs = document.getElementById('post_lang');
    const langs = postLangs.dataset.langs.split(',');
    const selectedIndex = postLangs.selectedIndex;

    const lang = langs[selectedIndex];

    reader.onload = (event) => {
      Tesseract.recognize(event.target.result, lang, {
        logger: (m) => console.log(m),
      }).then(({ data: { text } }) => {
        this.image_descriptionTarget.value = text;
      });
    };
    reader.readAsArrayBuffer(file);
  }
}