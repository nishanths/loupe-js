# Instructions:
# Run 'make dist'. Verify functionality in the demo. Then commit or publish.

.PHONY: default
default:
	@echo "the default target does nothing!"

.PHONY: dist
dist: clean
	yarn sass --no-source-map --style=compressed src/style.scss dist/style.css
	yarn tsc # produce commonjs format used by various package managers
	yarn webpack --mode=production --no-color # produce browser with exports at window.loupe

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

