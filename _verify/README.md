# Conversion baseline

`baseline-doctors.html` and `baseline-investors.html` are the exact HTML the old
JavaScript renderer (`app.js` template layer) produced for `/doctors` and `/investors`.

They exist so the PHP conversion can be proven byte-identical. To check:

    php -S 127.0.0.1:8000 router.php

then in another shell:

    curl -s http://127.0.0.1:8000/doctors   | sed -n 's/.*<div id="app">\(.*\)<\/div>.*/\1/p' > /tmp/doctors.html
    diff _verify/baseline-doctors.html /tmp/doctors.html

Delete this folder once you are satisfied.
