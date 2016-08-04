'use strict'

const DEFN = {
	BADGE: {
		ICON: `squirrel`,
		SVG: `M12 1C9.79 1 8 2.31 8 3.92c0 1.94.5 3.03 0 6.08 0-4.5-2.77-6.34-4-6.34.05-.5-.48-.66-.48-.66s-.22.11-.3.34c-.27-.31-.56-.27-.56-.27l-.13.58S.7 4.29.68 6.87c.2.33 1.53.6 2.47.43.89.05.67.79.47.99C2.78 9.13 2 8 1 8S0 9 1 9s1 1 3 1c-3.09 1.2 0 4 0 4H3c-1 0-1 1-1 1h6c3 0 5-1 5-3.47 0-.85-.43-1.79-1-2.53-1.11-1.46.23-2.68 1-2 .77.68 3 1 3-2 0-2.21-1.79-4-4-4zM2.5 6c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5z`,
	},
	HEAD: {
		TITLE: `PR Review Status`,
		SUBTITLE: `Changing the status will notify the team to check over your code`,
		ICON: `checklist`,
		SVG: `M16 8.5l-6 6-3-3L8.5 10l1.5 1.5L14.5 7 16 8.5zM5.7 12.2l.8.8H2c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h7c.55 0 1 .45 1 1v6.5l-.8-.8c-.39-.39-1.03-.39-1.42 0L5.7 10.8a.996.996 0 0 0 0 1.41v-.01zM4 4h5V3H4v1zm0 2h5V5H4v1zm0 2h3V7H4v1zM3 9H2v1h1V9zm0-2H2v1h1V7zm0-2H2v1h1V5zm0-2H2v1h1V3z`,
	},
	BUTTONS: [
		{
			LABEL: `pr-review`,
			TEXT: `Ask For Review`,
			ICON: `beaker`,
			SVG: `M14.38 14.59L11 7V3h1V2H3v1h1v4L.63 14.59A1 1 0 0 0 1.54 16h11.94c.72 0 1.2-.75.91-1.41h-.01zM3.75 10L5 7V3h5v4l1.25 3h-7.5zM8 8h1v1H8V8zM7 7H6V6h1v1zm0-3h1v1H7V4zm0-3H6V0h1v1z`,
			BTN: `background-image: linear-gradient(#36B7f1, #03A9F4); border-color: #03ACF9`
		},
		{
			LABEL: `pr-feedback-provided`,
			TEXT: `Feedback Provided`,
			ICON: `alert`,
			SVG: `M8.865 1.52c-.18-.31-.51-.5-.87-.5s-.69.19-.87.5L.275 13.5c-.18.31-.18.69 0 1 .19.31.52.5.87.5h13.7c.36 0 .69-.19.86-.5.17-.31.18-.69.01-1L8.865 1.52zM8.995 13h-2v-2h2v2zm0-3h-2V6h2v4z`,
			BTN: `background-image: linear-gradient(#0C8fCC, #0078AF); border-color: #0078AF`
		},
		{
			LABEL: `pr-ready`,
			TEXT: `Looks Good To Me!`,
			ICON: `rocket`,
			SVG: `M12.17 3.83c-.27-.27-.47-.55-.63-.88-.16-.31-.27-.66-.34-1.02-.58.33-1.16.7-1.73 1.13-.58.44-1.14.94-1.69 1.48-.7.7-1.33 1.81-1.78 2.45H3L0 10h3l2-2c-.34.77-1.02 2.98-1 3l1 1c.02.02 2.23-.64 3-1l-2 2v3l3-3v-3c.64-.45 1.75-1.09 2.45-1.78.55-.55 1.05-1.13 1.47-1.7.44-.58.81-1.16 1.14-1.72-.36-.08-.7-.19-1.03-.34a3.39 3.39 0 0 1-.86-.63M16 0s-.09.38-.3 1.06c-.2.7-.55 1.58-1.06 2.66-.7-.08-1.27-.33-1.66-.72-.39-.39-.63-.94-.7-1.64C13.36.84 14.23.48 14.92.28 15.62.08 16 0 16 0`,
			BTN: `background-image: linear-gradient(#64D269, #4CAF50); border-color: #4CAF50`
		},
	]
}

const STATUSES = DEFN.BUTTONS.map(b => b.LABEL)

const TEMPLATE = `
<div class="branch-action branch-action-state-clean" id="pr-review-ext-container">
	<span class="branch-action-icon">
		<svg aria-hidden="true" class="octicon octicon-${DEFN.BADGE.ICON}" height="32" version="1.1" viewBox="0 0 16 16" width="24">
			<path d="${DEFN.BADGE.SVG}"></path>
		</svg>
	</span>

	<div class="branch-action-body">
		<div class="mergeability-details js-details-container">
			<div class="branch-action-item">
				<div class="branch-action-item-icon completeness-indicator completeness-indicator-success">
					<svg aria-hidden="true" class="octicon octicon-${DEFN.HEAD.ICON}" height="16" version="1.1" viewBox="0 0 16 16" width="16">
						<path d="${DEFN.HEAD.SVG}"></path>
					</svg>
				</div>
				<h4 class="status-heading">${DEFN.HEAD.TITLE}</h4>
				<span class="status-meta">${DEFN.HEAD.SUBTITLE}</span>
			</div>

			<div class="merge-message">
				${DEFN.BUTTONS.map(d => `
					<button class="btn btn-primary" type="button" style="${d.BTN}" data-review="${d.LABEL}">
						<svg aria-hidden="true" class="octicon octicon-${d.ICON}" height="16" version="1.1" viewBox="0 0 16 16" width="12">
							<path d="${d.SVG}"></path>
						</svg>
						${d.TEXT}
					</button>
				`).join(' ')}

				<p class="alt-merge-options text-small" style="display: none;">
					You can also blah blah blah.
				</p>
			</div>

		</div>
	</div>
</div>`

const submitForm = form => {
	const e = new Event('submit', {bubbles: true})
	e.preventDefault()
	form.dispatchEvent(e)
}

const loadDropdown = (form) => {
	return new Promise(resolve => {
		const select = form.querySelector('.js-select-menu')
		if (select.classList.contains('js-load-contents')) {
			select.dispatchEvent(new Event('mouseenter'))
			setTimeout(resolve, 350) // wait for dropdown to load from server (use observer?)
		} else {
			resolve()
		}
	})
}

const changeReviewStatus = (to, onUpdate) => {
	const form = document.querySelector('form.js-issue-sidebar-form')

	loadDropdown(form).then(() => {
		STATUSES.forEach(status => {
			form.querySelector(`input[value=${status}]`).checked = status === to
		})

		submitForm(form)
		setTimeout(onUpdate, 350) // wait for sidebar to update (should use observer for this)
	})
}

function prReviewButtons() {
	if (document.getElementById('pr-review-ext-container')) return;
	
	const container = document.createElement('div')
	container.innerHTML = TEMPLATE
	document.querySelector('.merge-pr-more-commits').insertAdjacentElement('afterend', container)

	const update = () => {
		const labels = document.querySelector('.sidebar-labels')
		const current = STATUSES.filter(status => labels.querySelector(`.label[title=${status}]`))

		STATUSES.forEach(status => {
			const disabled = current.includes(status)
			const btn = container.querySelector(`[data-review=${status}]`)
			btn.disabled = disabled
			btn.style.opacity = disabled ? '0.5' : '1'
		})
	}

	Array.from(container.querySelectorAll('button')).forEach(btn => {
		btn.addEventListener('click', e => {
			changeReviewStatus(e.currentTarget.dataset.review, update)
		})
	})

	update()
}

document.addEventListener('DOMContentLoaded', () => {	
	gitHubInjection(window, function () {
		prReviewButtons()
	})
})
