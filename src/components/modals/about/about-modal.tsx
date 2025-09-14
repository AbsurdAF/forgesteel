import { Button, Divider, Space } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { DangerButton } from '../../controls/danger-button/danger-button';
import { Expander } from '../../controls/expander/expander';
import { Field } from '../../controls/field/field';
import { HeaderText } from '../../controls/header-text/header-text';
import { LogoPanel } from '../../panels/logo/logo-panel';
import { Modal } from '../modal/modal';
import { SelectablePanel } from '../../controls/selectable-panel/selectable-panel';

import pbds from '../../../assets/powered-by-draw-steel.png';
import pkg from '../../../../package.json';

import './about-modal.scss';

interface Props {
	errors: ErrorEvent[];
	clearErrors: () => void;
	onClose: () => void;
}

export const AboutModal = (props: Props) => {
	const clearErrors = () => {
		props.clearErrors();
		props.onClose();
	};

	try {
		return (
			<Modal
				content={
					<div className='about-modal'>
						<div className='logo-container'>
							<LogoPanel />
						</div>
						<p>
							Designed by <a href='mailto:andy.aiken@live.co.uk'>Andy Aiken</a>.
						</p>
						<p>
							To suggest a new feature or improvement, or to report a bug, go <a href='https://github.com/andyaiken/forgesteel/issues' target='_blank'>here</a>.
						</p>
						<p>
							If you would like to contribute to this project, you can find the code <a href='https://github.com/andyaiken/forgesteel' target='_blank'>here</a>.
						</p>
						<Field label='Version' value={pkg.version} />
						<Divider />
						<p>
							<b>FORGE STEEL</b> is free.
						</p>
						<p>
							If you really feel the need to show your appreciation, I'd be grateful if you would take whatever you feel the app is worth and donate it to a local mental health charity.
						</p>
						<p>
							If after all that you <i>still</i> have too much spare cash, you can always <a href='https://coff.ee/andyaiken' target='_blank'>buy me a coffee</a>.
						</p>
						<Divider />
						<div className='logo-container'>
							<img src={pbds} />
						</div>
						<p>
							<b>FORGE STEEL</b> is an independent product published under the DRAW STEEL Creator License and is not affiliated with MCDM Productions, LLC.
						</p>
						<p>
							<b>DRAW STEEL</b> © 2024 <a href='https://mcdmproductions.com/' target='_blank'>MCDM Productions, LLC.</a>
						</p>
						{
							props.errors.length > 0 ?
								<Divider />
								: null
						}
						{
							props.errors.length > 0 ?
								<Expander
									title='Logs'
									extra={[
										<DangerButton key='clear' mode='clear' onConfirm={clearErrors} />
									]}
								>
									<Space direction='vertical' style={{ width: '100%', paddingTop: '15px' }}>
										{
											props.errors.map((err, n) => (
												<SelectablePanel key={n}>
													<HeaderText
														extra={
															<Button
																type='text'
																icon={<CopyOutlined />}
																onClick={() => {
																	const str = `title ${err.message}, file ${err.filename}, line ${err.lineno}, col ${err.colno}, data ${err.error}`;
																	navigator.clipboard.writeText(str);
																}}
															/>
														}
													>
														{err.message}
													</HeaderText>
													<Field label='Location' value={`${err.filename}, line ${err.lineno}, column ${err.colno}`} />
													<Field label='Data' value={err.error} />
												</SelectablePanel>
											))
										}
									</Space>
								</Expander>
								: null
						}
					</div>
				}
				onClose={props.onClose}
			/>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
