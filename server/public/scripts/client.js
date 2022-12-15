$(document).ready(onReady);

function onReady() {
    getSongs();
    $('#add').on('click', postSong);
    $('#songsTableBody').on('click', '.delete', handleDelete);
    $('#songsTableBody').on('click', '.rank-up', handleRankUp);
    $('#songsTableBody').on('click', '.rank-down', handleRankDown);
}

function handleRankUp() {
    console.log('rank up');
}

function handleRankDown() {
    console.log('rank down');
}

function handleDelete() {
    const id = $(this).data('id');
    $.ajax({
        type: 'DELETE',
        url: `/musicLibrary/${id}`
    }).then(function () {
        getSongs();
    }).catch(function (error) {
        console.log('error with deleting, ', error);
    })
}

// get artist data from the server
function getSongs() {
    $("#songsTableBody").empty();
    $.ajax({
        type: 'GET',
        url: '/musicLibrary'
    }).then(function (response) {
        console.log("GET /musicLibrary response", response);
        // append data to the DOM
        for (let i = 0; i < response.length; i++) {
            $('#songsTableBody').append(`
                <tr>
                    <td>${response[i].artist}</td>
                    <td>${response[i].track}</td>
                    <td>${response[i].rank}</td>
                    <td>${response[i].published}</td>
                    <td>
                        <button class="rank-up">
                            up
                        </button>
                        <button class="rank-down">
                            down
                        </button>
                    </td>
                    <td>
                        <button class="delete" data-id=${response[i].id}>
                            delete
                        </button>
                    </td>
                </tr>
            `);
        }
    });
}

function postSong() {
    let payloadObject = {
        artist: $('#artist').val(),
        track: $('#track').val(),
        rank: $('#rank').val(),
        published: $('#published').val()
    }
    $.ajax({
        type: 'POST',
        url: '/musicLibrary',
        data: payloadObject
    }).then( function (response) {
        $('#artist').val(''),
        $('#track').val(''),    
        $('#rank').val(''),
        $('#published').val('')
        getSongs();
    });
}