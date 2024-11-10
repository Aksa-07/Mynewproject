document.getElementById("bookingForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission to allow validation

    // Retrieve form values
    const name = document.getElementById("name").value;
    const mobile = document.getElementById("mobile").value;
    const email = document.getElementById("email").value;
    const house = document.getElementById("house").value;
    const road = document.getElementById("road").value;
    const pincode = document.getElementById("pincode").value;
    const date = document.getElementById("date").value;

    // Retrieve selected fabrics
    const fabricElements = document.querySelectorAll("input[name='fabric']:checked");
    const fabrics = Array.from(fabricElements).map(fabric => fabric.value);

    // Check if all fields are filled
    if (!name || !mobile || !email || !house || !road || !pincode || !date || fabrics.length === 0) {
        alert("Please fill all the fields and select at least one fabric");
        return;
    }

    // Confirm booking details
    alert(`Appointment booked successfully!\n\nDetails:\nName: ${name}\nMobile: ${mobile}\nEmail: ${email}\nAddress:\n- ${house}\n- ${road}\nPincode: ${pincode}\nSelected Fabrics: ${fabrics.join(', ')}\nDate: ${date}`);
    
    // Clear the form after submission
    document.getElementById("bookingForm").reset();
});
