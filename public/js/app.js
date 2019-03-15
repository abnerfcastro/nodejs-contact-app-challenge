// IIFE - Immediately Invoked Function Expression
(function($, window, document) {
    // The $ is now locally scoped

    // Listen for the jQuery ready event on the document
    $(function() {
        // The DOM is ready!
        $('.js-hide-on-load').hide();

        function updateContactsTable() {
            $.ajax({
                type: 'GET',
                url: '/api/contact',
                success: function (contacts) {
                    // Empty children elements
                    $('#contacts__table > tbody').empty();
                    
                    const $contacts = $('#contacts__table > tbody:last-child');
                    $.each(contacts, (i, contact) => {
                        // HTML string for table row
                        let innerHtml = `<th scope="row">${contact.id}</th>`;
                        
                        // Iterate through contact properties, excluding id, and append to HTML string
                        for (let [key, value] of Object.entries(contact).slice(1))
                            innerHtml += `<td>${value}</td>`
                        
                        $contacts.append(`<tr>${innerHtml}</tr>`);
                    });
                }
            });
        }
        
        // Update table on first load
        updateContactsTable.call(this);

        $('#add__contact__btn').click(function () {            
            $('#contacts__table').fadeToggle(function () {
                $('#add__contact__section').fadeToggle();
            });
            $(this).toggleClass('disabled');
        });

        $('#add__contact__form')
            .find('[name="phone"]').mask('999-999-9999');

        // 'Cancel' button onclick event
        $('#add__contact__form > button[type="button"]').click(switchBackTransition);
        
        function switchBackTransition() {
            $('#add__contact__section').slideUp(300, function () {
                $('#contacts__table').fadeToggle();
                $('#add__contact__btn').toggleClass('disabled');
            });
        }

        $('#add__contact__form').submit(function () {
            let url = $(this).attr('action');
            let data = $(this).serialize();

            // POST api/contact
            $.post(url, data)
            .done(function () {
                switchBackTransition();
                updateContactsTable();
            })
            .fail(function () {
                $('#add__contact__alert').slideDown();
            })
            .catch(function () {
                console.log('error');
            });

            return false;
        });        
    });

    // Rest of the code...
    
})(window.jQuery, window, document);
// The global jQuery object is passed as a parameter