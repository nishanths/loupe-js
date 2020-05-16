WEBPACK := yarn webpack-cli
SASS := yarn sass

.PHONY: default
default:
	@echo "the default target does nothing!"

.PHONY: dev
dev: clean
	$(WEBPACK) --mode=development --watch

.PHONY: dist
dist: clean
	$(SASS) --no-source-map --style=compressed src/style.scss dist/style.css
	$(WEBPACK) --no-color --mode=production

.PHONY: clean
clean:
	rm -rf dist

.PHONY: fmt
fmt:
	# tsfmt
	find . -type f \( -name '*.ts' -o -name '*.tsx' \) \
		! -name '*.d.ts' \
		! -regex '.*/node_modules/.*' | \
		xargs yarn tsfmt --replace
