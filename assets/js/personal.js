document.getElementById('selectAll').addEventListener('change', function(e) {
    console.log("Checkbox de seleccionar todo cambiado:", e.target.checked);
    document.querySelectorAll('.select-row').forEach(checkbox => {
        checkbox.checked = e.target.checked;
    });
});

