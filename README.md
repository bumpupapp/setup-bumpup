```yaml
  - name: setup deno
        uses: denolib/setup-deno@v2
        with:
          deno-version: ${{matrix.deno}}
  - name: setup bumpup
    uses: danielr1996/gh-actions-bumpup@v2
  - name: version
    run: bumpup
```
