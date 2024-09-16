import { Career } from '../../../models/career';
import { FeaturePanel } from '../feature-panel/feature-panel';
import { HeaderText } from '../../controls/header-text/header-text';
import { Hero } from '../../../models/hero';
import { PanelMode } from '../../../enums/panel-mode';

import './career-panel.scss';

interface Props {
	career: Career;
	hero?: Hero;
	mode?: PanelMode;
}

export const CareerPanel = (props: Props) => {
	try {
		return (
			<div className='career-panel'>
				<HeaderText>{props.career.name}</HeaderText>
				<div className='ds-text description-text'>{props.career.description}</div>
				{
					props.mode === PanelMode.Full ?
						<div>
							{props.career.features.map(f => <FeaturePanel key={f.id} feature={f} hero={props.hero} />)}
							<FeaturePanel feature={props.career.title} hero={props.hero} />
						</div>
						: null
				}
			</div>
		);
	} catch {
		return null;
	}
};
