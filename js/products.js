/**
 * Products
 */

/**
 * @description Check product refresh info and check if is BlackHour product.
 * @function
 */
function checkProduct(){
    if(hoursBH === new Date().getHours() && minutesBH === new Date().getMinutes()){
        blackProducts = [];
        endedBH();
        writeLog("Black Hour finita: " + new Date().toLocaleString());
    }

    $.get("https://firestore.googleapis.com/v1beta1/projects/"
        + firebaseProjectId + "/databases/(default)/documents/"
        + firebaseCollection + "?pageSize=100&orderBy=orderView",
        function(data){
            debugLogs("CheckProduct done: " + new Date().toLocaleString());

            for(var index = 0; index < data.documents.length; index++) {
                var imgPath = data.documents[index].fields.imagePath.stringValue;
                var sku = data.documents[index].fields.sku.integerValue;
                var name = data.documents[index].fields.name.stringValue;
                var prezzoFlash = data.documents[index].fields.prezzoFlash.integerValue;
                var dataInizio = data.documents[index].fields.dataInizio.timestampValue;

                var classes;
                if(prezzoFlash == 99){
                    classes = "bg-warning";
                }

                if(blackProducts.indexOf(sku) === -1){
                    blackProducts.push(sku);
                    writeLog("Prodotto aggiunto alla lista! [SKU: " + sku + ']');
                    $('#product-table').append('<tr id="' + sku + '" class="' + classes + '">' +
                        '<td> <img src="http://' + imgPath + '" class="w-25 rounded-circle"></td>' +
                        '<td>' + sku +'</td>' +
                        '<td>' + name +'</td>' +
                        '<td>' + prezzoFlash + '</td>' +
                        '</tr>')
                    classes = null;
                }
            }
        });
}