var urlProject = "http://127.0.0.1:8000/progressus/"
var date_default;
$(document).ready(function() {
    var  yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    date_default =  verif(yesterday.getDate()) + '/' + verif(yesterday.getMonth() + 1)  + '/' +  yesterday.getFullYear();
    
    $('#date_re').val(date_default);
    rechercher();



    //$('.dataTables_info').insertAfter('.dataTable');​
    $('.chosen-select').chosen({width: "100%"});
    $('#date .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        format: "dd/mm/yyyy",
    });
    //console.log(csrftoken);












    
});
function reinitialiser_Champ(){
    $('#date_re').val(date_default);
    $('#matricule').val('').chosen({width: "100%"}).trigger("chosen:updated");
    rechercher();
}
function verif(nombre){
    var data = nombre.toString()
    if(data.length==1){
    data = '0'+data;
    }
    
    return data;
}
function dateFormat(date){
    var now = new Date(date);
    var dateString = moment(now).format('YYYY-MM-DD');
    var dateStringWithTime = moment(now).format('DD-MM-YYYY');
    return dateStringWithTime;
}

function rechercher(){
    $('#ibox2').children('.ibox-content').toggleClass('sk-loading');
    $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
    var date_re = $('#date_re').val();
    var mat = $('#matricule').val();
    $('#autre').html('');
    $.ajax({
        headers: {'X-CSRFToken': csrftoken},
        url  : 'recherche',
        type : 'GET',
        dataType: 'json',
        data : {
            'date' 				: date_re,
            'matricule' 			: JSON.stringify(mat),
            'csrfmiddlewaretoken': csrftoken,
        },
        success: function(res){
            //var var_data 				= JSON.parse(res);
            //console.log(res.autre);
            $('#autre').html(res.autre);
            //$('#table_liste_app').DataTable().destroy();
            //$('#script').append(res); 
            $('#ibox1').children('.ibox-content').toggleClass('sk-loading');
            recherche2 ();
            
        }
    });
   
}

function recherche2 (){
    $('#table_test').DataTable().destroy();
    $('#table_test').dataTable( {
         columns : [null,null,null,null,null,null],       
         lengthMenu: [[10,20, 25, 50, -1], [10,20, 25, 50, "Tous"]],
         pageLength: 20,
         paging: true,
         ajax: {
             url: urlProject+'recherche',
             data:function(data) {
                 //'.$ajax_options.'
                 data.date 			= $('#date_re').val();
                 data.matricule		= JSON.stringify($('#matricule').val());
                 data.csrfmiddlewaretoken= csrftoken;
                 
             }
         },
         columnDefs:[
             {
             targets: [0],className: 'text-center ',
             mRender: function ( data, type, row ) {
                 return '<span class="">'+row['Matricule']+
                         '</span>';
             }
             },
             {
             targets: [1],
                 mRender: function ( data, type, row ) {
                     return '<span class="">'+row['Nom']+
                             '</span>';
                 }
             },
             {
                 targets: [2],className: 'text-center ',
                     mRender: function ( data, type, row ) {
                         return '<span class="">'+row['Prenoms']+
                                 '</span>';
                     }
             },
             {
                 targets: [3],className: 'text-center ',
                     mRender: function ( data, type, row ) {
                         return '<span class="">'+dateFormat(row["Date_Con"])+
                                 '</span>';
                     }
             },
             {
                 targets: [4],className: 'text-center ',
                     mRender: function ( data, type, row ) {
                         return '<span class="">'+row['Connexion']+
                                 '</span>';
                     }
             },
             {
                 targets: [5],className: 'text-center ',
                     mRender: function ( data, type, row ) {
                         return '<span class="">'+row['Deconnexion']+
                                 '</span>';
                     }
             },
         ],
         dom: '<"html5buttons"B>lTfgitp',
         language: {
             processing:     "Traitement en cours...",
             search:         "Rechercher&nbsp;:",
             lengthMenu:    "Afficher _MENU_ &eacute;l&eacute;ments",
             info:           "Affichage de l\'&eacute;l&eacute;ment _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
             infoEmpty:      "Affichage de l\'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
             infoFiltered:   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
             infoPostFix:    "",
             loadingRecords: "Chargement en cours...",
             zeroRecords:    "Aucun &eacute;l&eacute;ment &agrave; afficher",
             emptyTable:     "Aucune donnée disponible dans le tableau",
             paginate: {
                 first:      "Premier",
                 previous:   "Pr&eacute;c&eacute;dent",
                 next:       "Suivant",
                 last:       "Dernier"
             },
             aria: {
                 sortAscending:  ": activer pour trier la colonne par ordre croissant",
                 sortDescending: ": activer pour trier la colonne par ordre décroissant"
             }
         },
         buttons: [
             { extend: 'copy'},
             {extend: 'csv'},
             {extend: 'excel', title: 'ExampleFile'},
             {extend: 'pdf', title: 'ExampleFile'},
         ],
         initComplete : function(settings, json) {
            $('#ibox2').children('.ibox-content').toggleClass('sk-loading');
            }
    });
     $(".dt-buttons").css("float","right");
     $("div.toolbar").css("float","right");
}
