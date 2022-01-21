{
    const $button = document.querySelector(".downloadImage")
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
        console.log(ImageUrl);

        $button.addEventListener('click', (event) => {
            event.preventDefault();
        })
    }



    const init = async () => {
        await getParams();
    }

    init();
}