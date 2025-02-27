import postcss from 'rollup-plugin-postcss';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';

/** @type {import("rollup").RollupOptions} */
export default {
    // 指定入口文件
    input: 'components/index.ts',
    // 不打包的产物
    external: ['react', 'react-dom'],
    // 指定产物
    output: [
        {
            file: 'dist/esm.js',
            format: 'esm',
        },
        {
            file: 'dist/cjs.js',
            format: 'cjs',
        },
        {
            file: 'dist/umd.js',
            name: 'MyLib',
            format: 'umd',
            globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
            },
        },
    ],
    plugins: [
        resolve(),
        commonjs(),
        typescript({
            tsconfig: 'rollup.tsconfig.json',
        }),
        // css 代码的编译和合并
        postcss({
            extract: true,
            extract: 'index.css',
        }),
        replace({
            'process.env.NODE_ENV': '"production"',
        }),
    ],
};
