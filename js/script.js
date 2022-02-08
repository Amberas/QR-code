{
    const $link = document.querySelector(".download");
    const $image = document.querySelector(".image");
    let url_str;
    let url;
    let search_params;
    let public_id;
    let ImageUrl;

    const getParams = () => {
        url_str = window.location.href;
        url = new URL(url_str);
        search_params = url.searchParams;
        if (search_params.get('id')) {
            console.log(search_params.get('id'));
            public_id = search_params.get('id');
            getImageUrl();
        } else {
            console.log("no public_id in url");
        }
    } 

    const getImageUrl = () => {
        ImageUrl = `https://res.cloudinary.com/dp8o3bbcj/image/upload/v1642718263/${public_id}.jpg`;
        $image.src = `https://res.cloudinary.com/dp8o3bbcj/image/upload/v1642718263/${public_id}.jpg`;
        forceDownload(ImageUrl);
    }

    const forceDownload = (imageUrl) => {
        let url = $link.getAttribute("data-href");
        url = imageUrl;
        let fileName = $link.getAttribute("download");
        $link.innerText = "Working...";
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = "blob";
        xhr.onload = function () {
            let urlCreator = window.URL || window.webkitURL;
            let imageUrl = urlCreator.createObjectURL(this.response);
            let tag = document.createElement('a');
            tag.href = imageUrl;
            tag.download = fileName;
            document.body.appendChild(tag);
            tag.click();
            document.body.removeChild(tag);
            $link.innerText = "Download";
        }
        xhr.send();
    }


    const init = async () => {
        await getParams();
        $link.addEventListener('click', forceDownload(url));
        $link.addEventListener('touchstart', forceDownload(url));
    }

    init();
}