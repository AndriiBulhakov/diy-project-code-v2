// prettier-ignore
function callApi() {
  // Map and input
  const input = document.querySelector('.code-input');
  const outputText = document.querySelectorAll('.code-output, .code-output-text');
  const summuryOutputWrapper = document.querySelector('.code-output-wrapper');
  const statesPaths = document.querySelectorAll('.svg-map path');
  const mapWrapper = document.querySelector('.wizard-code-map');
  // Buttons and notifications
  const notificationWindow = document.querySelector('.request-notification');
  const checkoutButton = document.querySelector('.checkout-button');
  const tabControls = document.querySelector('.tab-controls');
  const tabLinks = document.querySelectorAll('.tab-link');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const requestBlock = document.querySelector('.request-info');
  const wizardBottomContent = document.querySelector('.wizard-bottom-content');
  const zipErorr = document.querySelector('.error-text.is-zip');
  const priceWrapper = document.querySelector('.price-wrapper');
  // Forms
  const requestForm = document.querySelector('#request-form');
  const checkoutForm = document.querySelector('#checkout-form');
  const requestFormWrapper = document.querySelector('.request-form-wrapper');
  const checkoutFormWrapper = document.querySelector('.checkout-form-wrapper');
  // forms trigger buttons
  const requestFormTrigger = document.querySelector('.submit-button');
  const checkoutFormTrigger = document.querySelector('.checkout-button');
  // forms submit buttons
  const requestFormSubmit = document.querySelector('.request-submit');
  const checkoutFormSubmit = document.querySelector('.checkout-submit');

  // API details
  const apiUrl = "https://app.zipcodebase.com";
  const apiKey = "b5cf5250-19a6-11ee-be23-9dc79ba58fcf"
  // Default functions
  function classAdder(element, className) {
    element.classList.add(className)
  }
  function classRemover(element, className) {
    element.classList.remove(className)
  }

  // Output is hidden by default
  outputText.forEach(textItem => {
    if (textItem.classList.contains('code-output')) {
      textItem.addEventListener('click', function () {
        classAdder(this, 'is--hidden')
        input.focus()
      })
    }
  })


  // Tab links is not clickable by default
  function tabLinksNotClickable() {
    tabLinks.forEach(link => {
      classAdder(link, 'is--not-clickable')
    });
  }

  // Add event listener to submit button
  requestFormTrigger.addEventListener('click', () => {
    // remove active class from all tabs
    tabLinks.forEach(link => {
      link.classList.remove('w--current')
    })
    // remove active class from all panes
    tabPanes.forEach(pane => {
      pane.classList.remove('w--tab-active')
    })
    tabLinks[tabLinks.length - 1].classList.add('w--current')
    tabPanes[tabPanes.length - 1].classList.add('w--tab-active')

    // simulate click to request submit button
    requestFormSubmit.click()
  });

  // Add event listener to submit button
  checkoutFormTrigger.addEventListener('click', () => {
  // simulate click to checkout submit button
    checkoutFormSubmit.click()
  });

  tabLinksNotClickable()

  classAdder(wizardBottomContent, 'is--hidden')
  input.addEventListener('keypress', function (event) {
    if (event.keyCode == 13) {
      event.preventDefault();
    }
  })
  input.addEventListener('input', async () => {
    const code = input.value.trim()
    tabLinksNotClickable()
    function changeStateColors(fillColor, strokeColor, stateCode) {
      statesPaths.forEach(state => {
        if (state.getAttribute('data-name') === stateCode) {
          state.setAttribute('fill', fillColor)
          state.setAttribute('stroke', strokeColor)
        }
      })
    }
    zipErorr.style.display = 'none';
    input.style.borderBottom = '1px solid #000000';
    if (code.length === 5 && /^\d+$/.test(code)) {
      try {
        const response = await fetch(
          `${apiUrl}/api/v1/distance?apikey=${apiKey}&code=${code}&compare=95829,89115,90620,91761,85009,84115,73179,75149,77018,78596,35212,37086,34736,29063,27603,11741&country=us&unit=miles`
        )
        const finalResponse = await fetch(
          `${apiUrl}/api/v1/search?apikey=${apiKey}&codes=${code},10001&country=us`
        )


        if (response.ok || finalResponse.ok) {
          const data = await response.json()
          const finalData = await finalResponse.json()

          const dataObjectEntries = Object.entries(data.results)
          const objKeys = Object.keys(finalData.results)
          let stateChecker = false

          let firstOutput
          for (let i = 0; i < objKeys.length; i++) {
            if (input.value == objKeys[i]) {
              firstOutput = finalData.results[objKeys[i]]
            }
          }
          for (let i = 0; i < dataObjectEntries.length; i++) {
            if (dataObjectEntries[i][1] <= 150) {
              stateChecker = true
            }
          }

          if (objKeys.length > 0) {
            const [{ postal_code: postalCode, state_code: stateCode, city_en: city }] = firstOutput

            outputText.forEach(output => {
              output.textContent = `${postalCode}, ${stateCode}, ${city}`
              output.classList.remove('is--hidden')
              // check if output has tag name input
              if (output.tagName === 'INPUT') {
                output.value = `${postalCode}`
                console.log(output.value)
              }
            });

            zipErorr.style.display = 'none';

            classRemover(summuryOutputWrapper, 'is-hidden')
            classRemover(checkoutButton, 'is--hidden')
            classRemover(tabControls, 'is--hidden')
            classRemover(wizardBottomContent, 'is--hidden')
            classRemover(priceWrapper, 'is--hidden')
            tabLinks.forEach(link => {
              classRemover(link, 'is--not-clickable')
            })

            if (stateChecker === true) {
              // Postal code is in the list
              mapWrapper.classList.add('is--active')
              changeStateColors("#FF6B00", "#FF6B00", stateCode)
              // show checkoutFormWrapper and hide requestFormWrapper
              classRemover(checkoutFormWrapper, 'is--hidden')
              classAdder(requestFormWrapper, 'is--hidden')
              // set to the local storage flag that requesteZipCode true
              localStorage.setItem('requestedZipCode', true)
              // change input text color
              input.style.color = '#FF6B00'
              zipErorr.style.display = 'none';
            } else {
              // Postal code is not in the list
              notificationWindow.classList.remove('is--hidden')
              changeStateColors("black", "black", stateCode)
              classAdder(checkoutButton, 'is--hidden')
              classAdder(priceWrapper, 'is--hidden')
              classRemover(requestBlock, 'is--hidden')
              
              zipErorr.style.display = 'none';
              // show requestFormWrapper and hide checkoutFormWrapper
              classRemover(requestFormWrapper, 'is--hidden')
              classAdder(checkoutFormWrapper, 'is--hidden')
              // change input text color
              input.style.color = '#000000'
              // set to the local storage flag that requesteZipCode false
              localStorage.setItem('requestedZipCode', false)
            }
          } else {
            // outputText.textContent = 'No data available for the given code.'
          }
        } else {
          throw new Error('Error in API request')
        }
      } catch (error) {
        console.error('Error:', error)

        zipErorr.style.display = 'block';
        input.style.borderBottom = '1px solid #ff6b00';
      }
    } else {
      // empty input

      // clear requestedZipCode flag in local storage
      localStorage.removeItem('requestedZipCode')

      outputText.forEach(output => {
        output.textContent = ''
        output.classList.add('is--hidden')
        if (output.tagName === 'INPUT') {
          output.value = ''
          console.log(output.value)
        }
      })

      // change input text color
      input.style.color = '#000000'

      classAdder(summuryOutputWrapper, 'is-hidden')
      classAdder(checkoutButton, 'is--hidden')
      classAdder(tabControls, 'is--hidden')
      classAdder(requestBlock, 'is--hidden')
      classAdder(wizardBottomContent, 'is--hidden')
      
      tabLinksNotClickable()

      statesPaths.forEach(state => {
        state.setAttribute('fill', "#F8F5EC")
        state.setAttribute('stroke', "black")
      })
      notificationWindow.classList.add('is--hidden')
      mapWrapper.classList.remove('is--active')
    }
  });
}

export default callApi
