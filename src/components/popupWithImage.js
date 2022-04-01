import Popup from "./Popup";
export default class PopupWithImage extends Popup {
    constructor(popupSelector, popupImage, popupDescription ) {
        super(popupSelector);
        this._popupImage = popupImage;
        this._popupDescription = popupDescription;
    }
    open(cardImg, cardName) {
        super.open();
        this._popupImage.src = cardImg;
        this._popupImage.alt = cardName;
        this._popupDescription.textContent = cardName
        console.log(this._popupImage)
    }
}