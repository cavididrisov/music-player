class Music{
    constructor(title,singer,img,file){
        this.title=title;
        this.singer=singer;
        this.img=img;
        this.file=file;
    }
    getName(){
        return this.title + " - " + this.singer
    }
}

const musicList=[
    new Music("Ona Bele De","Elsever Goycayli","1.jpg","Elsever Goycayli - Ona Bele De (Official Audio).mp3"),
    new Music("Aman ayriliq","Emin Sabitoğlu","2.jpg","Aman ayrılıq (bəstəkarın ifasında)  Bəstəkar Emin Sabitoğlu.mp3"),
    new Music("vego vego","Shaker","3.jpg","Music vego vego.mp3"),
    
]