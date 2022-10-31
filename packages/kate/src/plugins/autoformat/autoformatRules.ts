import {
  autoformatArrow,
  autoformatLegal,
  autoformatLegalHtml,
  autoformatMath,
  autoformatPunctuation,
  autoformatSmartQuotes,
} from '@udecode/plate-autoformat';
import { KateAutoformatRule } from '../../plateTypes';
import { autoformatBlocks } from './autoformatBlocks';
import { autoformatLists } from './autoformatLists';
import { autoformatMarks } from './autoformatMarks';

export const autoformatRules = [
  ...autoformatBlocks,
  ...autoformatLists,
  ...autoformatMarks,
  ...(autoformatSmartQuotes as KateAutoformatRule[]),
  ...(autoformatPunctuation as KateAutoformatRule[]),
  ...(autoformatLegal as KateAutoformatRule[]),
  ...(autoformatLegalHtml as KateAutoformatRule[]),
  ...(autoformatArrow as KateAutoformatRule[]),
  ...(autoformatMath as KateAutoformatRule[]),
];
