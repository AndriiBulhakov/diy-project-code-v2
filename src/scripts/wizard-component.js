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
  const requestBlock = document.querySelector('.request-info');
  const wizardBottomContent = document.querySelector('.wizard-bottom-content');
  const submitButton = document.querySelector('.submit-button');
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
  submitButton.addEventListener('click', () => {
    const lastTab = tabLinks[tabLinks.length - 1];
    // activateTab(lastTab);
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
              console.log(dataObjectEntries[i][1])
              stateChecker = true
            }
          }

          if (objKeys.length > 0) {
            const [{ postal_code: postalCode, state_code: stateCode, city_en: city }] = firstOutput

            outputText.forEach(output => {
              output.textContent = `${postalCode}, ${stateCode}, ${city}`
              output.classList.remove('is--hidden')
            });

            classRemover(summuryOutputWrapper, 'is-hidden')
            classRemover(checkoutButton, 'is--hidden')
            classRemover(tabControls, 'is--hidden')
            classRemover(wizardBottomContent, 'is--hidden')
            tabLinks.forEach(link => {
              classRemover(link, 'is--not-clickable')
            })

            if (stateChecker === true) {
              mapWrapper.classList.add('is--active')
              changeStateColors("#FF6B00", "#FF6B00", stateCode)
            } else {
              notificationWindow.classList.remove('is--hidden')
              changeStateColors("black", "black", stateCode)
              classAdder(checkoutButton, 'is--hidden')
              classRemover(requestBlock, 'is--hidden')
            }
          } else {
            // outputText.textContent = 'No data available for the given code.'
          }
        } else {
          throw new Error('Error in API request')
        }
      } catch (error) {
        console.error('Error:', error)
      }
    } else {
      outputText.forEach(output => {
        output.textContent = ''
        output.classList.add('is--hidden')
      })

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
