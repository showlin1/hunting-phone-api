const loadPhone = async (searchText='13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}
const displayPhones = (phones, isShowAll) => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    //display show all button if there are more than 12
    const showAllContainer = document.getElementById('show-all-container')
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }
    // console.log('is show all', isShowAll);
    // display only first 12 phones if not show all
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        // console.log(phone);
        // 2 create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 p-4 shadow-xl`;
        //3: set inner html
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>There are many variations of passages of available, 
                but the majority have suffered</p>
                <div class="card-actions justify-center">
                    <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                </div>
            </div>
        `;
        //4: append child
        phoneContainer.appendChild(phoneCard);
    })

    // hide loading spinner
    toggleLoadingSpinner(false);
}

// 
const handleShowDetails = async(id) => {
    // console.log('clicked show details',id);
    // load single phone data
    const res = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const  phone = data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) =>{
    console.log(phone);
    const phoneName=document.getElementById('show-detail-phone-name');
    phoneName.innerText=phone.name;
    const showDetailContainer=document.getElementById('show-detail-container');
    showDetailContainer.innerHTML=`<img src="${phone.image}" alt""/>
    <p><span class="font-bold">Storage:</span>${phone.mainFeatures?.storage}<p>
    <p><span class="font-bold">Display Size:</span>${phone.mainFeatures?.displaySize}<p>
    <p><span class="font-bold">chipSet:</span>${phone.mainFeatures?.chipSet}<p>
    <p><span class="font-bold">Memory:</span>${phone.mainFeatures?.memory}<p>
    <p><span class="font-bold">Slug:</span>${phone.slug}<p>
    <p><span class="font-bold">Brand:</span>${phone.brand}<p>
    <p><span class="font-bold">releaseDate:</span>${phone.releaseDate}<p>
    <p><span class="font-bold">GPS:</span>${phone.others?.GPS}<p>
    `
    //show details
    show_details_modal.showModal();
}


// handle search button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}

// handle recap

// const handleSearch2 = () => {
//     toggleLoadingSpinner(true);
//     const searchField = document.getElementById('search-field2');
//     const searchText = searchField.value;
//     loadPhone(searchText);
//}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

//handle show all
const handleShowAll = () => {
    handleSearch(true);
}

loadPhone();