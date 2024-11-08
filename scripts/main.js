document.addEventListener('DOMContentLoaded', function () {
  console.log("DOM fully loaded and parsed");

  const deviceList = document.querySelector('.device-list');
  
  // Event delegation for toggling device connection status
  deviceList.addEventListener('click', function (event) {
      // Check if the clicked element is a list item but not the add-device button
      let target = event.target;
      while (target != deviceList) {
          if (target.matches('li:not(.add-device)')) {
              const status = target.querySelector('.status');
              
              // check if the status is "Ikke tilkoblet"
              if (status.textContent === 'Ikke tilkoblet') {
                  // set the status to "Tilkobler..."
                  status.textContent = 'Tilkobler...';
                  // simulate a delay of 2 seconds
                  setTimeout(() => {
                      // set the status to "Tilkoblet"
                      status.textContent = 'Tilkoblet';
                      target.style.backgroundColor = "#B4EFE7";
                  }, 2000);
              } else {
                  // set the status to "Ikke tilkoblet"
                  status.textContent = 'Ikke tilkoblet';
                  target.style.backgroundColor = "#E0F7FF";
              }
              return;
          }
          target = target.parentNode;
      }
  });

  const addButton = document.querySelector('.add-device');
  const modal = document.getElementById('addDeviceModal');
  const form = document.getElementById('newDeviceForm');

  // Show the modal
  function showModal() {
      modal.style.display = 'flex';
  }

  // Close the modal and clear the form / global function
  window.closeModal = function closeModal() {
      modal.style.display = 'none';
      form.reset(); // Reset the form
  }

  // Event listener to show the modal on clicking add device
  addButton.addEventListener('click', showModal);

  // Handle form submission
  form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission

      // Extracting the values from the form
      const deviceName = document.getElementById('deviceName').value;
      const deviceRange = document.getElementById('deviceRange').value;
      const deviceOwner = document.getElementById('deviceOwner').value;

      // Create the new list item
      const newItem = document.createElement('li');
      newItem.innerHTML = `${deviceName} <span class="status">Ikke tilkoblet</span>`;

      // Add new list item before the last device which is the 'add-device' button
      deviceList.insertBefore(newItem, addButton);

      closeModal(); // Close the modal after adding the device and clear the form
  });

  // Close modal on outside click (optional)
  window.onclick = function(event) {
      if (event.target == modal) {
          closeModal();
      }
  };
});
